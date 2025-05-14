import { Search } from 'lucide-react'

const TableSearch = () => {
  return (
    <div className='flex items-center gap-2 text-xs w-full md:w-auto rounded-full ring-[1.5px] ring-gray-300 px-2 '>
      <Search className='h-[12px] w-[12px]' />
      <input
        type='text'
        placeholder='Search...'
        className='w-[200px] p-2 bg-transparent outline-none'
      />
    </div>
  )
}

export default TableSearch
