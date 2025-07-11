import { prisma } from '@/lib/prisma'
import { MoreHorizontal } from 'lucide-react'

const UserCards = async ({ type }) => {
  const dataMap = {
    admin: prisma.admin,
    student: prisma.student,
    teacher: prisma.teacher,
    parent: prisma.parent,
  }
  const data = await dataMap[type].count()
  return (
    <div className='rounded-xl min-w-[130px] shadow-xl p-3 flex-1 even:bg-primary even:text-secondary odd:bg-white odd:text-primary dark:odd:bg-primary-foreground'>
      <div className='flex items-center justify-between'>
        <span className='text-[12px] bg-white rounded-full text-gray-800 px-2 py-1'>
          2025/26
        </span>
        <MoreHorizontal />
      </div>
      <h1 className='text-2xl font-bold my-4'>{data}</h1>
      <h2 className='capitalize font-semibold '>{type}s</h2>
    </div>
  )
}

export default UserCards
