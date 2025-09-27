import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PropertyCard } from '../PropertyCard'

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

const mockProperty = {
  id: 'test-id',
  name: 'Test Property',
  address: 'Test Address, FL',
  img: 'https://example.com/image.jpg',
  price: 500000,
}

describe('PropertyCard - Basic Tests', () => {
  it('renders property name and price', () => {
    render(<PropertyCard {...mockProperty} />)
    
    expect(screen.getByText('Test Property')).toBeInTheDocument()
    expect(screen.getByText('$500,000')).toBeInTheDocument()
  })

  it('renders property image', () => {
    render(<PropertyCard {...mockProperty} />)
    
    const image = screen.getByAltText('Test Property')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('renders view details link', () => {
    render(<PropertyCard {...mockProperty} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/properties/test-id')
    expect(link).toHaveTextContent('View Details')
  })
})
