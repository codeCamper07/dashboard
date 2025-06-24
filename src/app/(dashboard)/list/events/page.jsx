import FormModel from '@/components/FormModel'
import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { ArrowDownWideNarrow, SlidersHorizontal } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'

const { sessionClaims, userId } = await auth()
const role = sessionClaims.metadata?.role

const columns = [
  {
    header: 'Title',
    accessor: 'title',
  },
  {
    header: 'Class',
    accessor: 'class',
  },
  {
    header: 'Date',
    accessor: 'date',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Start Time',
    accessor: 'startTime',
    className: 'hidden md:table-cell',
  },
  {
    header: 'End Time',
    accessor: 'endTime',
    className: 'hidden md:table-cell',
  },
  ...(role === 'admin'
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
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.class.name}</TableCell>
      <TableCell className='hidden md:table-cell'>
        {new Date(item.startTime).toLocaleDateString('en-IN')}
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        {new Date(item.startTime).toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        {new Date(item.endTime).toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </TableCell>
      <TableCell className='table-cell'>
        {role === 'admin' && (
          <div className='flex gap-2'>
            <FormModel type='update' data={item} table='events' />
            <FormModel type='delete' id={item.id} table='events' />
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}

const EventListPage = async ({ searchParams }) => {
  const { page, ...queryParams } = await searchParams
  const p = page ? parseInt(page) : 1

  const query = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query.title = {
              contains: value,
              mode: 'insensitive',
            }
            break
          default:
            break
        }
      }
    }
  }

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId } } },
    student: { students: { some: { id: userId } } },
    parent: { students: { some: { parentId: userId } } },
  }

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: {
        ...(role !== 'admin' && {
          OR: [{ classId: null }, { class: roleConditions[role] || {} }],
        }),
      },
      include: { class: { select: { name: true } } },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.event.count({
      where: query,
    }),
  ])

  return (
    <div className='flex-1 bg-card m-4 mt-2 rounded-xl p-4'>
      {/* TOP Element */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block font-semibold text-lg'>Events</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <SlidersHorizontal />
            </Button>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <ArrowDownWideNarrow />
            </Button>
            {role === 'admin' && <FormModel type='create' table='events' />}
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

export default EventListPage
