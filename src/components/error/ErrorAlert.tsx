'use client'

import React from 'react'
import { ApiError } from '@/types/errorTypes'
import style from './errorAlert.module.scss'

interface ErrorAlertProps {
  error: ApiError | null
  onRetry?: () => void
  onDismiss?: () => void
  isRetrying?: boolean
  className?: string
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  onRetry,
  onDismiss,
  isRetrying = false,
  className = ''
}) => {
  if (!error) return null

  const getErrorIcon = () => {
    switch (error.code) {
      case 'NETWORK_ERROR':
        return '🌐'
      case 'SERVER_ERROR':
      case 'HTTP_500':
      case 'HTTP_502':
      case 'HTTP_503':
        return '⚠️'
      case 'NOT_FOUND':
      case 'HTTP_404':
        return '🔍'
      case 'UNAUTHORIZED':
      case 'HTTP_401':
        return '🔒'
      default:
        return '❌'
    }
  }

  const getErrorTitle = () => {
    switch (error.code) {
      case 'NETWORK_ERROR':
        return 'Error de conexión'
      case 'SERVER_ERROR':
      case 'HTTP_500':
      case 'HTTP_502':
      case 'HTTP_503':
        return 'Error del servidor'
      case 'NOT_FOUND':
      case 'HTTP_404':
        return 'No encontrado'
      case 'UNAUTHORIZED':
      case 'HTTP_401':
        return 'No autorizado'
      case 'HTTP_429':
        return 'Demasiadas solicitudes'
      default:
        return 'Error'
    }
  }

  return (
    <div className={`${style.errorAlert} ${className}`}>
      <div className={style.errorContent}>
        <div className={style.errorIcon}>
          {getErrorIcon()}
        </div>
        
        <div className={style.errorText}>
          <h4 className={style.errorTitle}>
            {getErrorTitle()}
          </h4>
          <p className={style.errorMessage}>
            {error.message}
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className={style.errorDetails}>
              <summary>Detalles técnicos</summary>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </details>
          )}
        </div>
      </div>

      <div className={style.errorActions}>
        {onRetry && (
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className={style.retryButton}
          >
            {isRetrying ? (
              <>
                <span className={style.spinner}></span>
                Reintentando...
              </>
            ) : (
              'Reintentar'
            )}
          </button>
        )}
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={style.dismissButton}
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  )
}
