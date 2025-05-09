import Announcement from '@/components/Announcement'
import BigCalendar from '@/components/BigCalendar'
import { AppCalendar } from '@/components/Calendar'

const StudentPage = () => {
  return (
    <div className='flex flex-col gap-4 p-4 xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3 '>
        <div className='h-full bg-card p-4 rounded-xl'>
          <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>
      {/* Right */}
      <div className='w-full xl:w-1/3 '>
        <div className='bg-card mb-4 p-4 rounded-xl'>
          <h1 className='text-foreground font-xl font-bold mb-2'>
            Events Calender
          </h1>
          <AppCalendar />
        </div>
        <div className='bg-card mb-4 p-4 rounded-xl'>
          <Announcement />
        </div>
      </div>
    </div>
  )
}

export default StudentPage
