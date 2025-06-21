import { prisma } from '@/lib/prisma'

const EventList = async ({ dateParams }) => {
  const date = dateParams ? new Date(dateParams) : new Date()

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  })
  return data.length > 0 ? (
    data.map((items) => {
      return (
        <div
          className='p-4 rounded-md border-1 border-t-4 even:border-t-sky-200 odd:border-t-purple-200'
          key={items.id}>
          <div className='flex justify-between items-center'>
            <h1 className='font-semibold text-primary'>{items.title}</h1>
            <span className='text-xs text-gray-400'>
              {new Date(items.startTime).toLocaleTimeString('en-IN', {
                hours: '2-digit',
                minutes: '2-digit',
                hour12: true,
              })}
            </span>
          </div>
          <p className='text-sm text-gray-500'>{items.description}</p>
        </div>
      )
    })
  ) : (
    <div className='p-4 rounded-md border-1 border-t-4 border-t-gray-200'>
      <p className='text-distructive'>No events found for this date.</p>
    </div>
  )
}

export default EventList
