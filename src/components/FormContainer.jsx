import { prisma } from '@/lib/prisma'
import FormModel from './FormModel'
import { auth } from '@clerk/nextjs/server'

const FormContainer = async ({ table, type, data, id }) => {
  const { sessionClaims, userId } = await auth()
  const role = sessionClaims?.metadata.role
  const currentUserId = userId

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
      case 'student':
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        })
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        })
        relatedData = { classes: studentClasses, grades: studentGrades }
        break
      case 'exams':
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === 'teacher' ? { teacherId: currentUserId } : {}),
          },
          select: { id: true, name: true },
        })
        relatedData = { lessons: examLessons }
        break
      case 'assignment':
        const assignmentLessons = await prisma.lesson.findMany({
          where: {
            ...(role === 'teacher' ? { teacherId: currentUserId } : {}),
          },
          select: { id: true, name: true },
        })
        relatedData = { lessons: assignmentLessons }
        break
      case 'event':
        const eventClass = await prisma.class.findMany({
          select: { id: true, name: true },
        })
        relatedData = { classes: eventClass }
        break
      case 'announcement':
        const announcementClass = await prisma.class.findMany({
          select: { id: true, name: true },
        })
        relatedData = { classes: announcementClass }
        break
      case 'lessons':
        const lessonClass = await prisma.class.findMany({
          select: { id: true, name: true },
        })
        const lessonSubject = await prisma.subject.findMany({
          select: { id: true, name: true },
        })
        const lessonTeacher = await prisma.teacher.findMany({
          select: { id: true, name: true },
        })
        relatedData = {
          classes: lessonClass,
          subjects: lessonSubject,
          teachers: lessonTeacher,
        }
        break
      case 'results':
        const resultExams = await prisma.exam.findMany({
          select: { id: true, title: true },
        })
        const resultAssignments = await prisma.assignment.findMany({
          select: { id: true, title: true },
        })
        const resultStudents = await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        })
        relatedData = {
          exams: resultExams,
          assignments: resultAssignments,
          students: resultStudents,
        }
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
