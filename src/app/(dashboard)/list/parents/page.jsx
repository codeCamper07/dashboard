import FormModel from '@/components/FormModel'
import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { SlidersHorizontal } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import TableSort from '@/components/TableSort'

const ParentListPage = async ({ searchParams }) => {
  const { page, order, ...queryParams } = await searchParams
  const p = page ? parseInt(page) : 1
  const { sessionClaims } = await auth()
  const role = sessionClaims.metadata?.role

  const query = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query.name = {
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

  const [data, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: {
        students: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
      orderBy: {
        name: order,
      },
    }),
    prisma.parent.count({
      where: query,
    }),
  ])

  const columns = [
    {
      header: 'Info',
      accessor: 'info',
    },
    {
      header: 'Parent Id',
      accessor: 'parentid',
    },
    {
      header: 'Student Names',
      accessor: 'student names',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Phone',
      accessor: 'phone',
      className: 'hidden lg:table-cell',
    },
    {
      header: 'Address',
      accessor: 'address',
      className: 'hidden lg:table-cell',
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
        <TableCell className='flex items-center gap-2'>
          <div className='flex flex-col gap-1'>
            <h3 className='font-bold text-md'>{item.name}</h3>
            <p className='font-extralight text-sm'>{item?.email}</p>
          </div>
        </TableCell>
        <TableCell className='table-cell'>{item.id}</TableCell>
        <TableCell className='hidden md:table-cell'>
          {item.students.map((student) => student.name).join(',')}
        </TableCell>
        <TableCell className='hidden lg:table-cell'>{item.phone}</TableCell>
        <TableCell className='hidden lg:table-cell'>{item.address}</TableCell>
        <TableCell className='table-cell'>
          {role === 'admin' && (
            <div className='flex gap-2'>
              <FormModel type='update' table='parent' data={item} />
              <FormModel type='delete' table='parent' id={item.id} />
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
        <h1 className='hidden md:block font-semibold text-lg'>All Parents</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <SlidersHorizontal />
            </Button>
            <TableSort />
            {role === 'admin' && <FormModel type='create' table='parent' />}
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

export default ParentListPage
