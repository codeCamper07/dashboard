import { prisma } from '@/lib/prisma'
import FormModel from './FormModel'

const FormContainer = async ({ table, type, data, id }) => {
  let relatedData = {}
  if (type !== 'delete') {
    switch (table) {
      case 'subject':
        const subjectRes = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        })
        relatedData = { teachers: subjectRes }
        break
      case 'class':
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        })
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        })
        relatedData = { teachers: classTeachers, grades: classGrades }
        break
      case 'teacher':
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        })
        relatedData = { subjects: teacherSubjects }
        break
      default:
        break
    }
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
