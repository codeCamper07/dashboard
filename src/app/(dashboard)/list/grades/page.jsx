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

const GradeListPage = async ({ searchParams }) => {
  const { page, order, ...queryParams } = await searchParams
  const p = page ? parseInt(page) : 1

  const { sessionClaims } = await auth()
  const role = sessionClaims.metadata?.role

  const query = {}
  query.classess = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query.classess = {
              some: {
                name: {
                  contains: value,
                  mode: 'insensitive',
                },
              },
            }
            break
          default:
            break
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.grade.findMany({
      where: query,
      include: { classess: { select: { name: true } } },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
      orderBy: {
        level: order,
      },
    }),
    prisma.grade.count({
      where: query,
    }),
  ])
  const columns = [
    {
      header: 'Id',
      accessor: 'id',
    },
    {
      header: 'Level',
      accessor: 'level',
    },
    {
      header: 'Classes',
      accessor: 'classes',
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
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.level}</TableCell>
        <TableCell className='hidden md:table-cell'>
          {item.classess.map((i) => i.name).join(',')}
        </TableCell>
        <TableCell className='table-cell'>
          {role === 'admin' && (
            <div className='flex gap-2'>
              <FormModel type='delete' id={item.id} table='grade' />
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
        <h1 className='hidden md:block font-semibold text-lg'>Grade Levels</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <SlidersHorizontal />
            </Button>
            <TableSort />
            {role === 'admin' && <FormModel type='create' table='grade' />}
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

export default GradeListPage
