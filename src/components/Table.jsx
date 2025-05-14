import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const TableComponent = ({ columns }) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((col) => {
            return (
              <TableHead key={col.accessor} className={col.className}>
                {col.header}
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow></TableRow>
      </TableBody>
    </Table>
  )
}

export default TableComponent
