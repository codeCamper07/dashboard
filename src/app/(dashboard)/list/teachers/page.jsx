import FormModel from '@/components/FormModel'
import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { ITEMS_PER_PAGE } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { ArrowDownWideNarrow, Book, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'

const { sessionClaims } = await auth()
const role = sessionClaims.metadata?.role

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Teacher ID',
    accessor: 'teacherId',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Subjects',
    accessor: 'subjects',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Classes',
    accessor: 'classes',
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
        <Image
          src={item.img || '/noAvatar.png'}
          alt={item.name}
          width={40}
          height={40}
          className='md:hidden xl:block w-10 h-10 rounded-full object-cover'
        />
        <div className='flex flex-col gap-1'>
          <h3 className='font-bold text-md'>{item.name}</h3>
          <p className='font-extralight text-sm'>{item?.email}</p>
        </div>
      </TableCell>
      <TableCell className='hidden md:table-cell'>{item.id}</TableCell>
      <TableCell className='hidden md:table-cell'>
        {item.subjects.map((subject) => subject.name).join(', ')}
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        {item.classes.map((classList) => classList.name).join(', ')}
      </TableCell>
      <TableCell className='hidden lg:table-cell'>{item.phone}</TableCell>
      <TableCell className='hidden lg:table-cell'>{item.address}</TableCell>
      <TableCell className='table-cell'>
        {role === 'admin' && (
          // <Button className='rounded-full w-7 h-7 flex items-center justify-center'>
          //   <Trash2 />
          // </Button>
          <div className='flex gap-2'>
            <Link href={`/list/teachers/${item.id}`}>
              <Button className='flex items-center justify-center rounded-full w-7 h-7'>
                <Book />
              </Button>
            </Link>
            <FormModel type='update' table='teacher' data={item} />
            <FormModel type='delete' table='teacher' id={item.id} />
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}

const TeachersListPage = async ({ searchParams }) => {
  const { page, ...queryParams } = await searchParams
  let p = page ? parseInt(page) : 1

  const query = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'classId':
            query.lessons = {
              some: {
                classId: parseInt(value),
              },
            }
            break

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
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({
      where: query,
    }),
  ])

  return (
    <div className='flex-1 bg-card m-4 mt-2 rounded-xl p-4'>
      {/* TOP Element */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block font-semibold text-lg'>All Teachers</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <SlidersHorizontal />
            </Button>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <ArrowDownWideNarrow />
            </Button>
            {role === 'admin' && (
              // <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              //   <Plus />
              // </Button>
              <FormModel type='create' table='teacher' />
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

export default TeachersListPage
