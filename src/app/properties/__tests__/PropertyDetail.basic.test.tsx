import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PropertyDetailPage from '../[id]/page'

jest.mock('../usePropertyDetail', () => ({
  usePropertyDetail: () => ({
    property: {
      id: 'test-id',
      name: 'Test Property',
      address: 'Test Address, FL',
      img: 'https://example.com/image.jpg',
      price: 500000,
      idProperty: 1001,
      codeInternal: 'FL-TEST-1001',
      year: 2020,
      idOwner: 1,
      owner: {
        id: 'owner-1',
        idOwner: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
      },
      propertyTraces: [],
    },
    loading: false,
    error: null,
    handleGoBack: jest.fn(),
  })
}))

jest.mock('next/image', () => {
  return function MockedImage({ src, alt, width, height, loading, placeholder, blurDataURL, ...props }: unknown) {
    return <img src={src} alt={alt} {...props} />
  }
})

describe('PropertyDetail - Basic Tests', () => {
  it('renders property title', () => {
    render(<PropertyDetailPage />)
    
    expect(screen.getByText('Property Detail')).toBeInTheDocument()
    expect(screen.getByText('Test Property')).toBeInTheDocument()
  })

  it('renders property information', () => {
    render(<PropertyDetailPage />)
    
    expect(screen.getByText('Test Address, FL')).toBeInTheDocument()
    expect(screen.getByText('$500,000')).toBeInTheDocument()
    expect(screen.getByText('Property ID:')).toBeInTheDocument()
    expect(screen.getByText('1001')).toBeInTheDocument()
  })

  it('renders owner information', () => {
    render(<PropertyDetailPage />)
    
    expect(screen.getByText('Owner Information')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('renders back button', () => {
    render(<PropertyDetailPage />)
    
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
  })
})
