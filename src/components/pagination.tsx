import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  /** How many page numbers to show on each side of the current page */
  siblingCount?: number
  className?: string
}

const DOTS = '...'

function getPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
) {
  // Total numbers shown: first, last, current, siblings on both sides, 2 dots
  const totalVisible = siblingCount * 2 + 5

  if (totalPages <= totalVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)

  const showLeftDots = leftSibling > 2
  const showRightDots = rightSibling < totalPages - 1

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, i) => i + 1,
    )
    return [...leftRange, DOTS, totalPages]
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, i) => totalPages - (3 + siblingCount * 2) + i + 1,
    )
    return [1, DOTS, ...rightRange]
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  )
  return [1, DOTS, ...middleRange, DOTS, totalPages]
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageRange(currentPage, totalPages, siblingCount)

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange(page)
  }

  return (
    <>
      <nav
        aria-label="Pagination"
        className={`flex items-center gap-x-1 ${className}`}
      >
        <button
          type="button"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex size-8 items-center rtl:rotate-180 justify-center rounded-md border border-borderColor text-muted
          transition-colors duration-150
          hover:bg-surface-hover hover:text-foreground
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
          disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((page, index) =>
          page === DOTS ? (
            <span
              key={`dots-${index}`}
              className="flex size-8 items-center justify-center text-sm text-muted"
            >
              {DOTS}
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => goTo(page as number)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`flex size-8 items-center justify-center rounded-md text-sm transition-colors duration-150 ${
                page === currentPage
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-surface-hover'
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex size-8 items-center rtl:rotate-180 justify-center rounded-md border border-borderColor text-muted
          transition-colors duration-150
          hover:bg-surface-hover hover:text-foreground
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
          disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </>
  )
}

export default Pagination
