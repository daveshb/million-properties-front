import { PaginatedResponse, PropertiesFilters, PropertyDetail } from "@/types/propertiesTypes";
import { createApiError } from "@/utils/errorHandler";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5049";

async function getProperties(
  filters: PropertiesFilters = {}
): Promise<PaginatedResponse> {
  try {
    const { name, address, minPrice, maxPrice, page = 1 } = filters;

    const response = await axios.get(`${API_URL}/properties`, {
      params: {
        name,
        address,
        minPrice,
        maxPrice,
        page,
      },
      timeout: 10000, // 10 segundos timeout
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw createApiError(error);
  }
}

async function getPropertyById(id: string): Promise<PropertyDetail> {
  try {
    const response = await axios.get(`${API_URL}/properties/${id}`, {
      timeout: 10000, // 10 segundos timeout
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    throw createApiError(error);
  }
}

export { getProperties, getPropertyById };


