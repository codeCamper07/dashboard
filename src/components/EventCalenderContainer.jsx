import { MoreHorizontal } from 'lucide-react'
import { AppCalendar } from './Calendar'
import EventList from './EventList'

const EventCalenderContainer = async ({ searchParams }) => {
  const { date } = await searchParams
  return (
    <div className='flex flex-col gap-4'>
      <AppCalendar />
      <div className='flex items-center justify-between'>
        <h1 className='text-foreground font-semibold text-lg'>Events</h1>
        <MoreHorizontal />
      </div>
      <EventList dateParams={date} />
    </div>
  )
}

export default EventCalenderContainer
