import Announcement from '@/components/Announcement'
import BigCalenderContainer from '@/components/BigCalenderContainer'
import { AppCalendar } from '@/components/Calendar'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

const StudentPage = async () => {
  const { userId } = await auth()
  const classItem = await prisma.class.findMany({
    where: {
      students: {
        some: {
          id: userId,
        },
      },
    },
  })
  return (
    <div className='flex flex-col gap-4 p-4 xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3 '>
        <div className='h-full bg-card p-5 rounded-xl'>
          <h1 className='text-xl font-semibold'>
            Schedule {classItem[0]?.name}
          </h1>
          <BigCalenderContainer type='studentId' id={classItem[0].id} />
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
