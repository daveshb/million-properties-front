'use client'

import React from 'react'
import style from './pagination.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  itemsPerPage: number
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getVisiblePages = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Si hay 5 páginas o menos, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage <= 3) {
        pages.push(2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return pages
  }

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={style.paginationContainer}>
      <div className={style.paginationInfo}>
        <span>
          Mostrando {startItem} - {endItem} de {totalItems} propiedades
        </span>
      </div>

      <div className={style.paginationControls}>
        
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`${style.paginationButton} ${style.prevButton}`}
          aria-label="Página anterior"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Anterior
        </button>

        <div className={style.pageNumbers}>
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {typeof page === 'number' ? (
                <button
                  onClick={() => handlePageClick(page)}
                  className={`${style.pageButton} ${page === currentPage ? style.activePage : ''}`}
                  aria-label={`Ir a página ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ) : (
                <span className={style.ellipsis}>{page}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`${style.paginationButton} ${style.nextButton}`}
          aria-label="Página siguiente"
        >
          Siguiente
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
