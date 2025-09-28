import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import axios from 'axios';

interface LeadData {
  fullName: string;
  email: string;
  tel: string;
  budget: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const leadData: LeadData = await request.json();
    
    if (!leadData.fullName || !leadData.email || !leadData.tel || !leadData.budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'leads';
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Sheets environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const cleanedTel = leadData.tel.replace(/[+\s]+/g, '');

    const rowData = [
      currentDate,
      leadData.fullName,
      leadData.email,
      cleanedTel,
      leadData.budget
    ];

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A:E:append?valueInputOption=USER_ENTERED`;

    // create JWT
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    };

    const token = jwt.sign(payload, GOOGLE_PRIVATE_KEY, { algorithm: 'RS256' });

    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', 
      new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Add row
    const sheetsResponse = await axios.post(url, {
      values: [rowData]
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const result = sheetsResponse.data;
    console.log('Lead saved to Google Sheets:', result);

    return NextResponse.json({ 
      success: true, 
      message: 'Lead saved successfully',
      updatedRange: result.updates?.updatedRange 
    });

  } catch (error) {
    console.error('Error saving lead to Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    );
  }
}