import FormModel from '@/components/FormModel'
import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { role } from '@/lib/data'
import { ITEMS_PER_PAGE } from '@/lib/paginationSettings'
import { prisma } from '@/lib/prisma'
import { ArrowDownWideNarrow, SlidersHorizontal } from 'lucide-react'

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
  {
    header: 'Actions',
    accessor: 'action',
  },
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
        {role === 'admin' && (
          <div className='flex gap-2'>
            <FormModel type='update' data={item} table='exams' />
            <FormModel type='delete' id={item.id} table='exams' />
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}

const ExamListPage = async ({ searchParams }) => {
  const { page, ...queryParams } = await searchParams
  const p = page ? parseInt(page) : 1

  const query = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query.lesson = {
              subject: {
                name: { contains: value, mode: 'insensitive' },
              },
            }
            break
        }
      }
    }
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
            {role === 'admin' && <FormModel type='create' table='exams' />}
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
