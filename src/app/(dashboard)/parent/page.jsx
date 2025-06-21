import Announcement from '@/components/Announcement'

import BigCalenderContainer from '@/components/BigCalenderContainer'
import { auth } from '@clerk/nextjs/server'

const Parentpage = async () => {
  const { userId } = await auth()
  const classItem = await prisma.class.findMany({
    where: {
      students: {
        some: {
          parentId: userId,
        },
      },
    },
  })
  return (
    <div className='flex-1 flex flex-col gap-4 p-4 xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3 '>
        <div className='h-full bg-card p-5 rounded-xl'>
          <h1 className='text-xl font-semibold'>Schedule (John Doe)</h1>
          <BigCalenderContainer type='parentId' id={classItem[0].id} />
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

export default Parentpage
