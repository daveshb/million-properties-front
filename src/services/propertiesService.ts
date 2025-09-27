import { PaginatedResponse, PropertiesFilters, PropertyDetail } from "@/types/propertiesTypes";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5049";

async function getProperties(
  filters: PropertiesFilters = {}
): Promise<PaginatedResponse> {
  const { name, address, minPrice, maxPrice, page = 1 } = filters;

  const response = await axios.get(`${API_URL}/properties`, {
    params: {
      name,
      address,
      minPrice,
      maxPrice,
      page,
    },
  });
  return response.data;
}

async function getPropertyById(id: string): Promise<PropertyDetail> {
  const response = await axios.get(`${API_URL}/properties/${id}`);
  return response.data;
}

export { getProperties, getPropertyById };


