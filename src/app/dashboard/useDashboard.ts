import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getProperties } from "../../services/propertiesService";
import { PaginatedResponse, Property } from "@/types/propertiesTypes";
import { ApiError } from "@/types/errorTypes";
import { useRetry } from "@/hooks/useRetry";
import { propertiesErrorHandler } from "@/utils/errorHandler";

export const useDashboard = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    pageNumber: 1,
    pageSize: 9,
    totalPages: 0
  });
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const router = useRouter();
  
  const { executeWithRetry, isRetrying } = useRetry({
    maxRetries: 3,
    shouldRetry: propertiesErrorHandler.shouldRetry,
    getRetryDelay: propertiesErrorHandler.getRetryDelay
  });

  const handleFetchProperties = useCallback(async (
    name: string, 
    address: string, 
    minPrice: string, 
    maxPrice: string,
    page: number = 1
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      const data: PaginatedResponse = await executeWithRetry(
        () => getProperties({
          name,
          address,
          minPrice,
          maxPrice,
          page
        }),
        (apiError) => {
          setError(apiError);
        }
      );
      
      setFilteredProperties(data.items);
      setPagination({
        totalCount: data.totalCount,
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalPages: data.totalPages
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, [executeWithRetry]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFetchProperties(name, address, minPrice, maxPrice, 1);
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

  const handlePageChange = useCallback((page: number) => {
    handleFetchProperties(name, address, minPrice, maxPrice, page);
  }, [name, address, minPrice, maxPrice, handleFetchProperties]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    router.push("/");
  }, [router]);

  const handleReset = useCallback(() => {
    setName("");
    setAddress("");
    setMinPrice("");
    setMaxPrice("");
    setError(null);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    handleFetchProperties(name, address, minPrice, maxPrice, pagination.pageNumber);
  }, [name, address, minPrice, maxPrice, pagination.pageNumber, handleFetchProperties]);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(() => ({
    filteredProperties,
    pagination,
    name,
    address,
    minPrice,
    maxPrice,
    loading,
    error,
    isRetrying,
    
    handleName,
    handleAddress,
    handleMinPrice,
    handleMaxPrice,
    handlePageChange,
    handleLogout,
    handleReset,
    handleRetry,
  }), [
    filteredProperties,
    pagination,
    name,
    address,
    minPrice,
    maxPrice,
    loading,
    error,
    isRetrying,
    handleName,
    handleAddress,
    handleMinPrice,
    handleMaxPrice,
    handlePageChange,
    handleLogout,
    handleReset,
    handleRetry,
  ]);
};
