import Announcement from '@/components/Announcement'
import BigCalenderContainer from '@/components/BigCalenderContainer'
import { auth } from '@clerk/nextjs/server'

const Teacher = async () => {
  const { userId } = await auth()
  return (
    <div className='flex-1 flex flex-col gap-4 p-4 xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3 '>
        <div className='h-full bg-card p-5 rounded-xl'>
          <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
          <BigCalenderContainer type='teacherId' id={userId} />
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
