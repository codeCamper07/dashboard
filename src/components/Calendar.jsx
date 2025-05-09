'use client'

import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar1Icon, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const events = [
  {
    id: 1,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
]

export function AppCalendar() {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  return (
    <div className='flex flex-col gap-4'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className='w-full'>
            <Calendar1Icon />
            {date ? format(date, 'PPP') : <span>Pick Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
            className='rounded-md border'
          />
        </PopoverContent>
      </Popover>
      <div className='flex items-center justify-between'>
        <h1 className='text-foreground font-semibold text-lg'>Events</h1>
        <MoreHorizontal />
      </div>
      <div className='flex-1 flex flex-col gap-4'>
        {events.map((items) => {
          return (
            <div className='p-4 rounded-md border-1 bg-card' key={items.id}>
              <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-primary'>{items.title}</h1>
                <span className='text-xs text-gray-400'>{items.time}</span>
              </div>
              <p className='text-sm text-gray-500'>{items.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
