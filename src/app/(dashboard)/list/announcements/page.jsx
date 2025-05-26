import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { role, announcementsData } from '@/lib/data'
import {
  ArrowDownWideNarrow,
  Plus,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react'

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
    header: 'Actions',
    accessor: 'action',
  },
]

const AnnouncementListPage = () => {
  const renderRow = (item) => {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.title}</TableCell>
        <TableCell>{item.class}</TableCell>
        <TableCell className='hidden md:table-cell'>{item.date}</TableCell>
        <TableCell className='flex items-center gap-2 justify-end'>
          {role === 'admin' && (
            <Button className='rounded-full w-7 h-7 flex items-center justify-center'>
              <Trash2 />
            </Button>
          )}
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className='flex-1 bg-card m-4 mt-2 rounded-xl p-4'>
      {/* TOP Element */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block font-semibold text-lg'>Announcements</h1>
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
          data={announcementsData}
          renderRow={renderRow}
        />
        {/* Pagination */}
        <PaginationComponent />
      </div>
    </div>
  )
}

export default AnnouncementListPage
