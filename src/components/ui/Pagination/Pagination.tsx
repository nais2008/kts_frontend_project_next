"use client"

import React from "react"

import classNames from "classnames"
import { ChevronLeft, ChevronRight } from "lucide-react"

import Button from "@/components/ui/Button"

import styles from "./Pagination.module.scss"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
}) => {
  const pages = React.useMemo<(number | string)[]>(() => {
    const delta = 1
    const result: (number | string)[] = []

    const range: number[] = []
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) result.push("...")
    result.push(1, ...range)
    if (currentPage + delta < totalPages - 1) result.push("...")
    result.push(totalPages)

    return result
  }, [currentPage, totalPages])

  const handlerPagePrev = React.useCallback(
    () => onChange(currentPage - 1),
    [onChange, currentPage]
  )
  const handlerPageNext = React.useCallback(
    () => onChange(currentPage + 1),
    [onChange, currentPage]
  )

  if (totalPages <= 1) return null

  const buttonNextDisabled = currentPage === totalPages
  const buttonPrevDisabled = currentPage === 1

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.pagination__navBtn}
        disabled={buttonPrevDisabled}
        onClick={handlerPagePrev}
      >
        <ChevronRight />
      </Button>

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <Button
            key={idx}
            onClick={() => onChange(p)}
            disabled={p === currentPage}
            className={classNames(styles.pagination__pageBtn, {
              [styles.active]: p === currentPage,
            })}
          >
            {p}
          </Button>
        ) : (
          <span key={idx} className={styles.dots}>
            {p}
          </span>
        )
      )}

      <Button
        className={styles.pagination__navBtn}
        disabled={buttonNextDisabled}
        onClick={handlerPageNext}
      >
        <ChevronLeft />
      </Button>
    </div>
  )
}

export default Pagination
