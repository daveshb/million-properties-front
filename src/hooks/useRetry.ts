import { useState, useCallback } from 'react';
import { ApiError } from '@/types/errorTypes';

interface UseRetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  shouldRetry?: (error: ApiError, retryCount: number) => boolean;
  getRetryDelay?: (retryCount: number) => number;
}

export const useRetry = (options: UseRetryOptions = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    shouldRetry,
    getRetryDelay
  } = options;

  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const executeWithRetry = useCallback(async <T>(
    operation: () => Promise<T>,
    onError?: (error: ApiError) => void
  ): Promise<T> => {
    let currentRetryCount = 0;
    
    while (currentRetryCount <= maxRetries) {
      try {
        setIsRetrying(currentRetryCount > 0);
        const result = await operation();
        setRetryCount(0);
        setIsRetrying(false);
        return result;
      } catch (error) {
        const apiError = error as ApiError;
        
        // Si no debería reintentar o ya llegamos al máximo
        if (!shouldRetry || !shouldRetry(apiError, currentRetryCount) || currentRetryCount >= maxRetries) {
          setRetryCount(0);
          setIsRetrying(false);
          onError?.(apiError);
          throw apiError;
        }
        
        currentRetryCount++;
        setRetryCount(currentRetryCount);
        
        // Esperar antes del siguiente intento
        const delay = getRetryDelay ? getRetryDelay(currentRetryCount) : retryDelay;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error('Max retries exceeded');
  }, [maxRetries, retryDelay, shouldRetry, getRetryDelay]);

  const reset = useCallback(() => {
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  return {
    executeWithRetry,
    isRetrying,
    retryCount,
    reset
  };
};
