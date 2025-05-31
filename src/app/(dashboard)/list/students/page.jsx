import FormModel from '@/components/FormModel'
import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { role, studentsData } from '@/lib/data'
import { ArrowDownWideNarrow, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Student ID',
    accessor: 'studentId',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Class',
    accessor: 'class',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Grade',
    accessor: 'grade',
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

const StudentListPage = () => {
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
        <TableCell className='hidden md:table-cell'>{item.studentId}</TableCell>
        <TableCell className='hidden md:table-cell'>{item.class}</TableCell>
        <TableCell className='hidden md:table-cell'>{item.grade}</TableCell>
        <TableCell className='hidden lg:table-cell'>{item.phone}</TableCell>
        <TableCell className='hidden lg:table-cell'>{item.address}</TableCell>
        <TableCell className='flex items-center gap-2 justify-end'>
          {role === 'admin' && (
            // <Button className='rounded-full w-7 h-7 flex items-center justify-center'>
            //   <Trash2 />
            // </Button>
            <>
              <FormModel type='update' table='student' data={item} />
              <FormModel type='delete' table='student' id={item.id} />
            </>
          )}
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className='flex-1 bg-card m-4 mt-2 rounded-xl p-4'>
      {/* TOP Element */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block font-semibold text-lg'>All Students</h1>
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
              <FormModel type='create' table='student' />
            )}
          </div>
        </div>
      </div>
      <div className=''>
        {/* Table */}
        <TableComponent
          columns={columns}
          data={studentsData}
          renderRow={renderRow}
        />
        {/* Pagination */}
        <PaginationComponent />
      </div>
    </div>
  )
}

export default StudentListPage
