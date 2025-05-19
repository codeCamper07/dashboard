import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const TableComponent = ({ columns, data, renderRow }) => {
  return (
    <Table>
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
      <TableBody>{data.map((item) => renderRow(item))}</TableBody>
    </Table>
  )
}

export default TableComponent
