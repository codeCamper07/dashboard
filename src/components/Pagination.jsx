'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ITEMS_PER_PAGE } from '@/lib/paginationSettings'

const PaginationComponent = ({ page, count }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' />
        </PaginationItem>
        <PaginationItem>
          {Array.from(
            {
              length: Math.ceil(count / ITEMS_PER_PAGE),
            },
            (_, Index) => {
              const pageIndex = Index + 1
              return (
                <PaginationLink
                  isActive={page === pageIndex}
                  key={pageIndex}
                  href='#'>
                  {pageIndex}
                </PaginationLink>
              )
            },
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href='#' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
