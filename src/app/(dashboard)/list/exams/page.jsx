import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { ArrowDownWideNarrow, SlidersHorizontal } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import FormContainer from '@/components/FormContainer'

const ExamListPage = async ({ searchParams }) => {
  const { page, ...queryParams } = await searchParams
  const p = page ? parseInt(page) : 1
  const { sessionClaims, userId } = await auth()
  const role = sessionClaims.metadata?.role

  const query = {}
  query.lesson = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query.lesson.subject = {
              name: { contains: value, mode: 'insensitive' },
            }
            break
          case 'classId':
            query.lesson.classId = parseInt(value)
            break
          case 'teacherId':
            query.lesson.teacherId = value
            break
          default:
            break
        }
      }
    }
  }
  switch (role) {
    case 'admin':
      break
    case 'teacher':
      query.lesson.teacherId = userId
      break
    case 'student':
      query.lesson.class = {
        students: {
          some: { id: userId },
        },
      }
      break
    case 'parent':
      query.lesson.class = {
        students: {
          some: { parentId: userId },
        },
      }
      break
    default:
      break
  }

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.exam.count({
      where: query,
    }),
  ])

  const columns = [
    {
      header: 'Subject Name',
      accessor: 'subject',
    },
    {
      header: 'Class',
      accessor: 'class',
    },
    {
      header: 'Teacher',
      accessor: 'teacher',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Exam Date',
      accessor: 'date',
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
        <TableCell>{item.lesson.subject.name}</TableCell>
        <TableCell>{item.lesson.class.name}</TableCell>
        <TableCell className='hidden md:table-cell'>
          {item.lesson.teacher.name}
        </TableCell>
        <TableCell>
          {new Date(item.startTime).toLocaleDateString('en-IN')}
        </TableCell>
        <TableCell className='table-cell'>
          {(role === 'admin' || role === 'teacher') && (
            <div className='flex gap-2'>
              <FormContainer type='update' data={item} table='exams' />
              <FormContainer type='delete' id={item.id} table='exams' />
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
        <h1 className='hidden md:block font-semibold text-lg'>Exams</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <SlidersHorizontal />
            </Button>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <ArrowDownWideNarrow />
            </Button>
            {(role === 'admin' || role === 'teacher') && (
              <FormContainer type='create' table='exams' />
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

export default ExamListPage
