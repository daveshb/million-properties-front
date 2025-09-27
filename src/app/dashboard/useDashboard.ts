import { useState, useEffect, useCallback, useMemo } from "react";
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

  const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  }, []);

  const handleAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  }, []);

  const handleMinPrice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
  }, []);

  const handleMaxPrice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    router.push("/");
  }, [router]);

  const handleReset = useCallback(() => {
    setName("");
    setAddress("");
    setMinPrice("");
    setMaxPrice("");
  }, []);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(() => ({
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
  }), [
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
  ]);
};
