'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { buttonVariants } from './ui/button'

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
          <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 py-2 has-[>svg]:px-3 gap-1 px-2.5 sm:pr-2.5 cursor-pointer`}
            disabled={!checkPrev}
            onClick={() => changePage(page - 1)}>
            <ChevronLeftIcon size={17} />
            <span className='hidden sm:block text-sm'>Previous</span>
          </button>
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
          <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 py-2 has-[>svg]:px-3 gap-1 px-2.5 sm:pr-2.5 cursor-pointer`}
            disabled={!checkNxt}
            onClick={() => changePage(page + 1)}>
            <span className='hidden sm:block text-sm'>Next</span>
            <ChevronRightIcon size={17} />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
