import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getProperties } from "@/services/propertiesService";

type Props = {
  address: string;
  codeInternal: string;
  id: string;
  idOwner: number;
  idProperty: number;
  img: string;
  name: string;
  price: number;
  year: number;
};

export const useDashboard = () => {
  const [filteredProperties, setFilteredProperties] = useState<Props[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleFetchProperties = useCallback(async (name: string, address: string, minPrice: string, maxPrice: string) => {
    try {
      setLoading(true);
      const data = await getProperties(name, address, minPrice, maxPrice);
      setFilteredProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFetchProperties(name, address, minPrice, maxPrice);
    }, 500);  

    return () => clearTimeout(timeoutId);
  }, [name, address, minPrice, maxPrice, handleFetchProperties]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleReset = () => {
    setName("");
    setAddress("");
    setMinPrice("");
    setMaxPrice("");
  };

  return {
    filteredProperties,
    name,
    address,
    minPrice,
    maxPrice,
    loading,
    
    handleName,
    handleAddress,
    handleMinPrice,
    handleMaxPrice,
    handleLogout,
    handleReset,
  };
};
