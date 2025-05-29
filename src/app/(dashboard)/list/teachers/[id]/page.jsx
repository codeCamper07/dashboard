import BigCalendar from '@/components/BigCalendar'
import {
  Calendar1,
  ClipboardList,
  Droplet,
  LaptopMinimalCheck,
  ListChecks,
  MailIcon,
  NotebookPen,
  Phone,
} from 'lucide-react'
import Image from 'next/image'

const SingleTeacherPage = () => {
  return (
    <div className='flex-1 p-4 flex flex-col gap-4 lg:flex-row'>
      {/* Left */}
      <div className='w-full lg:w-2/3'>
        {/* Top */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* userInfo */}
          <div className='flex-1 flex gap-4 px-4 py-4 rounded-md bg-card'>
            <div className='w-1/3'>
              <Image
                src='https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200'
                alt='profileImg'
                width={140}
                height={140}
                className='w-28 h-28 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col gap-4 justify-between'>
              <h1 className='text-xl font-bold'>John Doe</h1>
              <p className='text-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className='flex items-center justify-between gap-2 flex-wrap text-sm font-medium '>
                <div className='flex items-center gap-2 w-full md:w-1/3 lg:w-full'>
                  <Droplet className='w-[14px] h-[14px]' />
                  <span>A+</span>
                </div>
                <div className='flex items-center gap-2 w-full md:w-1/3 lg:w-full'>
                  <Calendar1 className='w-[14px] h-[14px]' />
                  <span>January,2025</span>
                </div>
                <div className='flex items-center gap-2 w-full md:w-1/3 lg:w-full'>
                  <MailIcon className='w-[14px] h-[14px]' />
                  <span>Johndoe@example.com</span>
                </div>
                <div className='flex items-center gap-2 w-full md:w-1/3 lg:w-full'>
                  <Phone className='w-[14px] h-[14px]' />
                  <span>123456789</span>
                </div>
              </div>
            </div>
          </div>
          {/* smallCards */}
          <div className='flex-1 flex justify-between gap-4 flex-wrap'>
            <div
              className='flex gap-4 p-4 bg-card rounded-md w-full md:w-[48%] 
            lg:w-[45%] 2xl:w-[48%]'>
              <ListChecks className='w-6 h-6' />
              <div>
                <h1 className='text-lg font-semibold'>90%</h1>
                <p className='text-sm'>Attendance</p>
              </div>
            </div>
            <div
              className='flex gap-4 p-4 bg-card rounded-md w-full md:w-[48%] 
            lg:w-[45%] 2xl:w-[48%]'>
              <ClipboardList className='w-6 h-6' />
              <div>
                <h1 className='text-lg font-semibold'>2</h1>
                <p className='text-sm'>Branches</p>
              </div>
            </div>
            <div
              className='flex gap-4 p-4 bg-card rounded-md w-full md:w-[48%] 
            lg:w-[45%] 2xl:w-[48%]'>
              <NotebookPen className='w-6 h-6' />
              <div>
                <h1 className='text-lg font-semibold'>6</h1>
                <p className='text-sm'>Lessons</p>
              </div>
            </div>
            <div
              className='flex gap-4 p-4 bg-card rounded-md w-full md:w-[48%] 
            lg:w-[45%] 2xl:w-[48%]'>
              <LaptopMinimalCheck className='w-6 h-6' />
              <div>
                <h1 className='text-lg font-semibold'>6</h1>
                <p className='text-sm'>Classes</p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className='mt-4 p-4 bg-card rounded-md h-[800px]'>
          <h1 className='text-lg font-semibold'>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* Right */}
      <div className='w-full lg:w-1/3'>R</div>
    </div>
  )
}

export default SingleTeacherPage
