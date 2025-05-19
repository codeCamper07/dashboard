import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { teachersData } from '@/lib/data'
import {
  ArrowDownWideNarrow,
  FileSymlink,
  Plus,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
  {
    header: 'Actions',
    accessor: 'action',
    className: 'text-right',
  },
]

const TeachersListPage = () => {
  const renderRow = (item) => {
    return (
      <TableRow key={item.id}>
        <TableCell className='flex items-center gap-2'>
          <Image
            src={item.photo}
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
        <TableCell className='hidden md:table-cell'>{item.teacherId}</TableCell>
        <TableCell className='hidden md:table-cell'>
          {item.subjects.join(', ')}
        </TableCell>
        <TableCell className='hidden md:table-cell'>
          {item.classes.join(', ')}
        </TableCell>
        <TableCell className='hidden lg:table-cell'>{item.phone}</TableCell>
        <TableCell className='hidden lg:table-cell'>{item.address}</TableCell>
        <TableCell className='flex items-center gap-2 justify-end'>
          <Link href={`/list/teachers/${item.id}`}>
            <Button className='rounded-full w-7 h-7 flex items-center justify-center'>
              <FileSymlink />
            </Button>
          </Link>
          <Button className='rounded-full w-7 h-7 flex items-center justify-center'>
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
    )
  }

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
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <div className=''>
        {/* Table */}
        <TableComponent
          columns={columns}
          data={teachersData}
          renderRow={renderRow}
        />
        {/* Pagination */}
        <PaginationComponent />
      </div>
    </div>
  )
}

export default TeachersListPage
