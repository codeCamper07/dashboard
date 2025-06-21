import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

const Announcement = async () => {
  const { userId, sessionClaims } = await auth()
  const role = sessionClaims?.metadata.role

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId } } },
    student: { students: { some: { id: userId } } },
    parent: { students: { some: { parentId: userId } } },
  }

  const events = await prisma.Announcement.findMany({
    take: 3,
    orderBy: { date: 'desc' },
    where: {
      ...(role !== 'admin' && {
        OR: [{ classId: null }, { class: roleConditions[role] || {} }],
      }),
    },
  })

  return (
    <div className='flex flex-col gap-4 bg-card p-4 rounded-md'>
      <div className='flex items-center justify-between'>
        <h1 className='text-foreground font-semibold text-lg'>Announcements</h1>
        <span className='text-sm text-gray-400'>View More</span>
      </div>
      <div className='flex-1 flex flex-col gap-4'>
        {events.map((items) => {
          return (
            <div
              className='p-4 rounded-md border-1 even:bg-sky-400 odd:bg-purple-400'
              key={items.id}>
              <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-primary'>{items.title}</h1>
                <span className='text-xs'>
                  {new Date(items.date).toLocaleDateString('en-IN')}
                </span>
              </div>
              <p className='text-sm'>{items.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Announcement
