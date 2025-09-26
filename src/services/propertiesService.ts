import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5049";


async function getProperties(name: string, address?: string, minPrice?: string, maxPrice?: string) {
  const response = await axios.get(`${API_URL}/properties`, {
    params: { name, address, minPrice, maxPrice },
  });
  return response.data;
}

export { getProperties };


