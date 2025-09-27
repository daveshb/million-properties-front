import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Dashboard from '../page'

jest.mock('../useDashboard', () => ({
  useDashboard: () => ({
    filteredProperties: [
      {
        id: 'test-id',
        name: 'Test Property',
        address: 'Test Address',
        img: 'https://example.com/image.jpg',
        price: 500000,
      }
    ],
    name: '',
    address: '',
    minPrice: '',
    maxPrice: '',
    loading: false,
    handleName: jest.fn(),
    handleAddress: jest.fn(),
    handleMinPrice: jest.fn(),
    handleMaxPrice: jest.fn(),
    handleLogout: jest.fn(),
    handleReset: jest.fn(),
  })
}))

jest.mock('next/image', () => {

  return function MockedImage({ src, alt, width, height, loading, placeholder, blurDataURL, ...props }: unknown) {
    return <img src={src} alt={alt} {...props} />
  }
})

jest.mock('next/link', () => {
  return function MockedLink({ children, href, ...props }: { children: React.ReactNode, href: string }) {
    return <a href={href} {...props}>{children}</a>
  }
})

describe('Dashboard - Basic Tests', () => {
  it('renders dashboard title', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Million Properties')).toBeInTheDocument()
    expect(screen.getByText('Properties')).toBeInTheDocument()
  })

  it('renders filter inputs', () => {
    render(<Dashboard />)
    
    expect(screen.getByLabelText('Property Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Min Price')).toBeInTheDocument()
    expect(screen.getByLabelText('Max Price')).toBeInTheDocument()
  })

  it('renders property cards', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Test Property')).toBeInTheDocument()
    expect(screen.getByText('$500,000')).toBeInTheDocument()
  })
})
