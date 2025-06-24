import Announcement from '@/components/Announcement'
import BigCalendar from '@/components/BigCalendar'
import { StackedChart } from '@/components/StackedChart'
import { prisma } from '@/lib/prisma'
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
import Link from 'next/link'

const SingleStudentPage = async ({ params }) => {
  const { id } = await params
  const student = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  })
  return (
    <div className='flex-1 p-4 flex flex-col gap-4 lg:flex-row'>
      {/* Left */}
      <div className='w-full lg:w-2/3'>
        {/* Top */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* userInfo */}
          <div className='flex-1 flex gap-4 px-4 py-4 rounded-md bg-sky-400'>
            <div className='w-1/3'>
              <Image
                src={student.img || '/noAvatar.png'}
                alt='profileImg'
                width={140}
                height={140}
                className='w-28 h-28 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col gap-4 justify-between'>
              <h1 className='text-xl font-bold'>
                {student.name + ' ' + student.surname}
              </h1>
              <p className='text-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className='flex items-center justify-between gap-2 flex-wrap text-sm font-medium '>
                <div className='flex items-center gap-2 w-full md:w-1/3 lg:w-full'>
                  <Droplet className='w-[14px] h-[14px]' />
                  <span>{student.bloodType}</span>
                </div>
                <div className='flex items-center gap-2 w-full md:w-1/3 lg:w-full'>
                  <Calendar1 className='w-[14px] h-[14px]' />
                  <span>
                    {' '}
                    {new Date(student.birthday).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <div className='flex items-center gap-2 w-full md:w-1/3 lg:w-full'>
                  <MailIcon className='w-[14px] h-[14px]' />
                  <span>{student.email || '-'}</span>
                </div>
                <div className='flex items-center gap-2 w-full md:w-1/3 lg:w-full'>
                  <Phone className='w-[14px] h-[14px]' />
                  <span>{student.phone || '-'}</span>
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
                <h1 className='text-lg font-semibold'>
                  {student.class.name.charAt(0)}th
                </h1>
                <p className='text-sm'>Grade</p>
              </div>
            </div>
            <div
              className='flex gap-4 p-4 bg-card rounded-md w-full md:w-[48%] 
            lg:w-[45%] 2xl:w-[48%]'>
              <NotebookPen className='w-6 h-6' />
              <div>
                <h1 className='text-lg font-semibold'>
                  {student.class._count.lessons}
                </h1>
                <p className='text-sm'>Lessons</p>
              </div>
            </div>
            <div
              className='flex gap-4 p-4 bg-card rounded-md w-full md:w-[48%] 
            lg:w-[45%] 2xl:w-[48%]'>
              <LaptopMinimalCheck className='w-6 h-6' />
              <div>
                <h1 className='text-lg font-semibold'>6A</h1>
                <p className='text-sm'>Class</p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className='mt-4 p-4 bg-card rounded-md h-[800px]'>
          <h1 className='text-lg font-semibold'>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* Right */}
      <div className='w-full lg:w-1/3 flex flex-col gap-4'>
        {/* Shortcuts */}
        <div className='bg-card p-4 rounded-md'>
          <h1 className='text-lg font-semibold'>Shortcuts</h1>
          <div className='flex flex-wrap gap-4 text-xs mt-4'>
            <Link
              className='p-3 bg-sky-400 rounded-md'
              href={`/list/lessons?classId=${student.class.id}`}>
              Student&apos;s Lessons
            </Link>
            <Link
              className='p-3 bg-purple-400 rounded-md'
              href={`/list/teachers?classId=${student.class.id}`}>
              Student&apos;s Teachers
            </Link>
            <Link
              className='p-3 bg-yellow-400 rounded-md'
              href={`/list/exams?classId=${student.class.id}`}>
              Student&apos; Exams
            </Link>
            <Link
              className='p-3 bg-pink-400 rounded-md'
              href={`/list/assignments?classId=${student.class.id}`}>
              Student&apos;s Assignments
            </Link>
            <Link
              className='p-3 bg-sky-400 rounded-md'
              href={`/list/results?studentId=${student.id}`}>
              Student&apos;s results
            </Link>
          </div>
        </div>
        {/* Performance Chart */}
        <StackedChart />
        {/* Announcement */}
        <Announcement />
      </div>
    </div>
  )
}

export default SingleStudentPage
