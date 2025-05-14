import Announcement from '@/components/Announcement'
import BigCalendar from '@/components/BigCalendar'

const Teacher = () => {
  return (
    <div className='flex-1 flex flex-col gap-4 p-4 xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3 '>
        <div className='h-full bg-card p-5 rounded-xl'>
          <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>
      {/* Right */}
      <div className='w-full xl:w-1/3 '>
        <div className='bg-card mb-4 p-4 rounded-xl'>
          <Announcement />
        </div>
      </div>
    </div>
  )
}

export default Teacher
