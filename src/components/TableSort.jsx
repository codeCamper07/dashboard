'use client'

import { ArrowDownWideNarrow } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const TableSort = () => {
  const router = useRouter()
  const handleSort = () => {
    const params = new URLSearchParams(window.location.search)
    const currentOrder = params.get('order') || 'asc'
    const nextOrder = currentOrder === 'asc' ? 'desc' : 'asc'
    params.set('order', nextOrder)
    router.push(`${window.location.pathname}?${params}`)
  }
  return (
    <Button
      onClick={handleSort}
      className='rounded-full w-8 h-8 flex items-center justify-center '>
      <ArrowDownWideNarrow />
    </Button>
  )
}

export default TableSort
