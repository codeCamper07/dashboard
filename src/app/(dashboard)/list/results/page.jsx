import FormModel from '@/components/FormModel'
import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { role, resultsData } from '@/lib/data'
import { ArrowDownWideNarrow, SlidersHorizontal } from 'lucide-react'

const columns = [
  {
    header: 'Subject Name',
    accessor: 'name',
  },
  {
    header: 'Student',
    accessor: 'student',
  },
  {
    header: 'Score',
    accessor: 'score',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Teacher',
    accessor: 'teacher',
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
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'action',
  },
]

const ResultListPage = () => {
  const renderRow = (item) => {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.subject}</TableCell>
        <TableCell>{item.student}</TableCell>
        <TableCell className='hidden md:table-cell'>{item.score}</TableCell>
        <TableCell className='hidden md:table-cell'>{item.teacher}</TableCell>
        <TableCell className='hidden md:table-cell'>{item.class}</TableCell>
        <TableCell className='hidden md:table-cell'>{item.date}</TableCell>
        <TableCell className='table-cell'>
          {role === 'admin' && (
            <div className='flex gap-2'>
              <FormModel type='update' data={item} table='results' />
              <FormModel type='delete' id={item.id} table='results' />
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
        <h1 className='hidden md:block font-semibold text-lg'>Results</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <SlidersHorizontal />
            </Button>
            <Button className='rounded-full w-8 h-8 flex items-center justify-center '>
              <ArrowDownWideNarrow />
            </Button>
            {role === 'admin' && <FormModel type='create' table='results' />}
          </div>
        </div>
      </div>
      <div className=''>
        {/* Table */}
        <TableComponent
          columns={columns}
          data={resultsData}
          renderRow={renderRow}
        />
        {/* Pagination */}
        <PaginationComponent />
      </div>
    </div>
  )
}

export default ResultListPage
