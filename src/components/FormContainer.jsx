import { prisma } from '@/lib/prisma'
import FormModel from './FormModel'

const FormContainer = async ({ table, type, data, id }) => {
  let relatedData = {}
  switch (table) {
    case 'subject':
      const res = await prisma.teacher.findMany({
        select: { id: true, name: true, surname: true },
      })
      relatedData = { teachers: res }
      break
    default:
      break
  }
  return (
    <FormModel
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  )
}

export default FormContainer
