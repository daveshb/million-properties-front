import { ApiError, ErrorType, ErrorHandler } from '@/types/errorTypes';

export const createApiError = (error: unknown): ApiError => {
  // Type guard para errores de axios
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response: { status: number; data: unknown } };
    const status = axiosError.response.status;
    const data = axiosError.response.data;
    
    return {
      message: (data && typeof data === 'object' && 'message' in data ? (data as { message: string }).message : null) || getDefaultErrorMessage(status),
      code: (data && typeof data === 'object' && 'code' in data ? (data as { code: string }).code : null) || `HTTP_${status}`,
      status,
      details: data
    };
  } else if (error && typeof error === 'object' && 'request' in error) {
    // Error de red
    return {
      message: 'Error de conexión. Verifica tu internet e intenta de nuevo.',
      code: ErrorType.NETWORK_ERROR,
      status: 0
    };
  } else {
    // Error desconocido
    const errorMessage = error && typeof error === 'object' && 'message' in error 
      ? (error as { message: string }).message 
      : 'Unknown error';
      
    return {
      message: 'Ha ocurrido un error inesperado. Intenta de nuevo.',
      code: ErrorType.UNKNOWN_ERROR,
      details: errorMessage
    };
  }
};

const getDefaultErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return 'Solicitud inválida. Verifica los datos enviados.';
    case 401:
      return 'No autorizado. Inicia sesión nuevamente.';
    case 403:
      return 'No tienes permisos para realizar esta acción.';
    case 404:
      return 'Recurso no encontrado.';
    case 429:
      return 'Demasiadas solicitudes. Espera un momento e intenta de nuevo.';
    case 500:
      return 'Error interno del servidor. Intenta más tarde.';
    case 502:
      return 'Servidor no disponible temporalmente.';
    case 503:
      return 'Servicio temporalmente no disponible.';
    default:
      return `Error del servidor (${status}). Intenta más tarde.`;
  }
};

export const propertiesErrorHandler: ErrorHandler = {
  handle: createApiError,
  
  shouldRetry: (error: ApiError, retryCount: number): boolean => {
    if (retryCount >= 3) return false;
    
    return (
      error.code === ErrorType.NETWORK_ERROR ||
      (error.status !== undefined && error.status >= 500)
    );
  },
  
  getRetryDelay: (retryCount: number): number => {
    return Math.min(1000 * Math.pow(2, retryCount - 1), 4000);
  }
};

export const openaiErrorHandler: ErrorHandler = {
  handle: createApiError,
  
  shouldRetry: (error: ApiError, retryCount: number): boolean => {
    return retryCount < 2 && error.code === ErrorType.NETWORK_ERROR;
  },
  
  getRetryDelay: (retryCount: number): number => {
    return 2000 * retryCount; 
  }
};
