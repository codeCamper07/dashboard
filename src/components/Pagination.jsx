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
import { useRouter } from 'next/navigation'

const PaginationComponent = ({ page, count }) => {
  const router = useRouter()

  const checkPrev = ITEMS_PER_PAGE * (page - 1) > 0
  const checkNxt = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count

  const changePage = (newPage) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', newPage.toString())
    router.push(`${window.location.pathname}?${params}`)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${!checkPrev ? 'invisible' : ''} cursor-pointer`}
            onClick={() => changePage(page - 1)}
          />
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
                  className='cursor-pointer'
                  isActive={page === pageIndex}
                  key={pageIndex}
                  onClick={() => changePage(pageIndex)}>
                  {pageIndex}
                </PaginationLink>
              )
            },
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={`${!checkNxt ? 'invisible' : ''} cursor-pointer`}
            onClick={() => changePage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
