import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { CheckCircle, XCircle, SlidersHorizontal } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import FormContainer from '@/components/FormContainer'
import TableSort from '@/components/TableSort'

const AttendanceListPage = async ({ searchParams }) => {
  const { page, order, ...queryParams } = await searchParams
  let p = page ? parseInt(page) : 1
  const { sessionClaims, userId } = await auth()
  const role = sessionClaims.metadata?.role

  const query = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query.OR = [
              {
                student: {
                  name: {
                    contains: value,
                    mode: 'insensitive',
                  },
                },
              },
              {
                lesson: {
                  name: {
                    contains: value,
                    mode: 'insensitive',
                  },
                },
              },
            ]
            break
          case 'studentId':
            query.studentId = value
            break
          case 'lessonId':
            query.lessonId = parseInt(value)
            break
          case 'classId':
            query.lesson = {
              classId: parseInt(value),
            }
            break
        }
      }
    }
  }

  // Add role-based filtering
  switch (role) {
    case 'teacher':
      query.lesson = {
        ...query.lesson,
        teacherId: userId,
      }
      break
    case 'student':
      query.studentId = userId
      break
    case 'parent':
      query.student = {
        parentId: userId,
      }
      break
    default:
      break
  }

  const [data, count] = await prisma.$transaction([
    prisma.attendance.findMany({
      where: query,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            surname: true,
            class: {
              select: {
                name: true,
              },
            },
          },
        },
        lesson: {
          select: {
            id: true,
            name: true,
            subject: {
              select: {
                name: true,
              },
            },
            class: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
      orderBy: {
        date: order,
      },
    }),
    prisma.attendance.count({
      where: query,
    }),
  ])

  const columns = [
    {
      header: 'Student',
      accessor: 'student',
    },
    {
      header: 'Lesson',
      accessor: 'lesson',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Class',
      accessor: 'class',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Date',
      accessor: 'date',
      className: 'hidden lg:table-cell',
    },
    {
      header: 'Status',
      accessor: 'status',
    },
    ...(role === 'admin' || role === 'teacher'
      ? [
          {
            header: 'Actions',
            accessor: 'action',
          },
        ]
      : []),
  ]

  const renderRow = (item) => {
    return (
      <TableRow key={item.id}>
        <TableCell className='flex items-center gap-2'>
          <div className='flex flex-col gap-1'>
            <h3 className='font-bold text-md'>
              {item.student.name} {item.student.surname}
            </h3>
            <p className='font-extralight text-sm'>{item.student.class.name}</p>
          </div>
        </TableCell>

        <TableCell className='hidden md:table-cell'>
          <div className='flex flex-col gap-1'>
            <span className='font-medium'>{item.lesson.name}</span>
            <span className='text-xs text-gray-500'>
              {item.lesson.subject.name}
            </span>
          </div>
        </TableCell>

        <TableCell className='hidden md:table-cell'>
          {item.lesson.class.name}
        </TableCell>

        <TableCell className='hidden lg:table-cell'>
          {item.date.toLocaleDateString()}
        </TableCell>

        <TableCell>
          <div className='flex items-center gap-2'>
            {item.present ? (
              <>
                <CheckCircle className='w-4 h-4 text-green-500' />
                <span className='text-green-700 font-medium'>Present</span>
              </>
            ) : (
              <>
                <XCircle className='w-4 h-4 text-red-500' />
                <span className='text-red-700 font-medium'>Absent</span>
              </>
            )}
          </div>
        </TableCell>

        <TableCell className='table-cell'>
          {(role === 'admin' || role === 'teacher') && (
            <div className='flex gap-2'>
              <FormContainer type='update' table='attendance' data={item} />
              <FormContainer type='delete' table='attendance' id={item.id} />
            </div>
          )}
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className='flex-1 bg-card m-4 mt-2 rounded-xl p-4'>
      {/* TOP Element */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block font-semibold text-lg'>
          All Attendance Records
        </h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <SlidersHorizontal />
            </Button>
            <TableSort />
            {(role === 'admin' || role === 'teacher') && (
              <FormContainer type='create' table='attendance' />
            )}
          </div>
        </div>
      </div>

      <div className=''>
        {/* Table */}
        <TableComponent columns={columns} data={data} renderRow={renderRow} />
        {/* Pagination */}
        <PaginationComponent page={p} count={count} />
      </div>
    </div>
  )
}

export default AttendanceListPage
