import FormModel from '@/components/FormModel'
import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { role, subjectsData } from '@/lib/data'
import { ArrowDownWideNarrow, SlidersHorizontal } from 'lucide-react'

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
  {
    header: 'Actions',
    accessor: 'action',
    className: 'text-right',
  },
]

const SubjectListPage = () => {
  const renderRow = (item) => {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell className='hidden md:table-cell'>
          {item.teachers.join(', ')}
        </TableCell>
        <TableCell className='flex items-center gap-2 justify-end'>
          {role === 'admin' && (
            <>
              <FormModel type='update' table='subjects' data={item} />
              <FormModel type='delete' table='subjects' id={item.id} />
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
        <h1 className='hidden md:block font-semibold text-lg'>All Subjects</h1>
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
              // <Button className='rounded-full w-8 h-8 flex items-center justify-center'>
              //   <Plus />
              // </Button>
              <>
                <FormModel type='create' table='subjects' />
              </>
            )}
          </div>
        </div>
      </div>
      <div className=''>
        {/* Table */}
        <TableComponent
          columns={columns}
          data={subjectsData}
          renderRow={renderRow}
        />
        {/* Pagination */}
        <PaginationComponent />
      </div>
    </div>
  )
}

export default SubjectListPage
