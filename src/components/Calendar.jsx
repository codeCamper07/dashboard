'use client'

import { Calendar } from '@/components/ui/calendar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function AppCalendar() {
  const [date, setDate] = useState(new Date())
  const router = useRouter()

  useEffect(() => {
    if (date instanceof Date) {
      router.push(`?date=${date.toLocaleDateString('en-US')}`)
    }
  }, [date, router])
  return (
    <div className='flex-1 flex flex-col gap-4 w-full'>
      <Calendar
        mode='single'
        selected={date}
        onSelect={(date) => {
          setDate(date)
        }}
        className='h-full w-full flex'
        classNames={{
          months:
            'flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1',
          month: 'space-y-4 w-full flex flex-col',
          table: 'w-full h-full border-collapse space-y-1',
          head_row: '',
          row: 'w-full mt-2',
        }}
      />
    </div>
  )
}
