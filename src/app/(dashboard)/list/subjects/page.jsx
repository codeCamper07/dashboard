import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { SlidersHorizontal } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import FormContainer from '@/components/FormContainer'
import TableSort from '@/components/TableSort'

const SubjectListPage = async ({ searchParams }) => {
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
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
      orderBy: {
        name: order,
      },
    }),
    prisma.subject.count({
      where: query,
    }),
  ])

  const columns = [
    {
      header: 'No',
      accessor: 'no',
    },
    {
      header: 'Subject',
      accessor: 'subject',
    },
    {
      header: 'Teachers Names',
      accessor: 'Teachers names',
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
        <TableCell>{item.name}</TableCell>
        <TableCell className='hidden md:table-cell'>
          {item.teachers.map((teacher) => teacher.name).join(',')}
        </TableCell>
        <TableCell className='table-cell'>
          {role === 'admin' && (
            <div className='flex gap-2'>
              <FormContainer type='update' table='subject' data={item} />
              <FormContainer type='delete' table='subject' id={item.id} />
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
        <h1 className='hidden md:block font-semibold text-lg'>All Subjects</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <SlidersHorizontal />
            </Button>
            <TableSort />
            {role === 'admin' && (
              <FormContainer type='create' table='subject' />
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

export default SubjectListPage
