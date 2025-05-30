import React from 'react'

const events = [
  {
    id: 1,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
]

const Announcement = () => {
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
                <span className='text-xs'>{items.time}</span>
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
