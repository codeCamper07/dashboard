import Announcement from '@/components/Announcement'

import BigCalenderContainer from '@/components/BigCalenderContainer'
import { auth } from '@clerk/nextjs/server'

const Parentpage = async () => {
  const { userId } = await auth()
  const currentUserId = userId

  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId,
    },
  })
  return (
    <div className='flex-1 flex flex-col gap-4 p-4 xl:flex-row'>
      {/* LEFT */}
      {students.map((student) => (
        <div className='w-full xl:w-2/3' key={student.id}>
          <div className='h-full bg-white p-4 rounded-md'>
            <h1 className='text-xl font-semibold'>
              Schedule ({student.name + ' ' + student.surname})
            </h1>
            <BigCalenderContainer type='classId' id={student.classId} />
          </div>
        </div>
      ))}
      {/* Right */}
      <div className='w-full xl:w-1/3 '>
        <div className='bg-card mb-4 p-4 rounded-xl'>
          <Announcement />
        </div>
      </div>
    </div>
  )
}

export default Parentpage
