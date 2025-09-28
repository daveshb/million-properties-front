jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}))

import { getProperties, getPropertyById } from '../propertiesService'
import axios from 'axios'

const mockGet = (axios.get as jest.Mock)

const mockProperty = {
  id: 'test-id',
  name: 'Test Property',
  address: 'Test Address, FL',
  img: 'https://example.com/image.jpg',
  price: 500000,
}

describe('propertiesService - Basic Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch properties', async () => {
    const mockResponse = {
      items: [mockProperty],
      totalCount: 1,
      pageNumber: 1,
      pageSize: 9,
      totalPages: 1
    }
    mockGet.mockResolvedValue({ data: mockResponse })

    const result = await getProperties({})

    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining('/properties'),
      expect.any(Object)
    )
    expect(result).toEqual(mockResponse)
  })

  it('should fetch property by id', async () => {
    mockGet.mockResolvedValue({ data: mockProperty })

    const result = await getPropertyById('test-id')

    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining('/properties/test-id'),
      expect.any(Object)
    )
    expect(result).toEqual(mockProperty)
  })

  it('should handle errors', async () => {
    const error = new Error('Network error')
    mockGet.mockRejectedValue(error)

    try {
      await getProperties({})
      fail('Expected function to throw')
    } catch (e) {
      expect(e).toBeDefined()
    }

    try {
      await getPropertyById('test-id')
      fail('Expected function to throw')
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
