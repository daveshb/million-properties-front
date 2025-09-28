import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById  } from "@/services/propertiesService";
import { PropertyDetail } from "@/types/propertiesTypes";

export const usePropertyDetail = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { id } = params;

  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await getPropertyById(id);
        setProperty(data);
        setError(null);
      } catch {
        setError("Could not load the property details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  return {
    property,
    loading,
    error,
    
    handleGoBack,
  };
};
