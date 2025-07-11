import PaginationComponent from '@/components/Pagination'
import TableComponent from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { SlidersHorizontal } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import TableSort from '@/components/TableSort'
import FormContainer from '@/components/FormContainer'

const ResultListPage = async ({ searchParams }) => {
  const { page, order, ...queryParams } = await searchParams
  const p = page ? parseInt(page) : 1
  const { sessionClaims, userId } = await auth()
  const role = sessionClaims.metadata?.role

  const query = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'studentId':
            query.studentId = value
            break
          case 'search':
            query.OR = [
              { exam: { title: { contains: value, mode: 'insensitive' } } },
              { student: { name: { contains: value, mode: 'insensitive' } } },
            ]
            break
          default:
            break
        }
      }
    }
  }

  switch (role) {
    case 'admin':
      break
    case 'teacher':
      query.OR = [
        { exam: { lesson: { teacherId: userId } } },
        { assignment: { lesson: { teacherId: userId } } },
      ]
      break
    case 'student':
      query.studentId = userId
      break
    case 'parent':
      query.student = {
        parentId: userId,
      }
      break
    default:
      break
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
      orderBy: {
        id: order,
      },
    }),
    prisma.result.count({ where: query }),
  ])

  const data = dataRes.map((item) => {
    const assessment = item.exam || item.assignment

    const isExam = 'startTime' in assessment

    if (!assessment) return null
    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      className: assessment.lesson.class.name,
      date: isExam ? assessment.startTime : assessment.startDate,
    }
  })

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
    ...(role === 'admin' || role === 'teacher'
      ? [
          {
            header: 'Actions',
            accessor: 'action',
          },
        ]
      : []),
  ]
  const renderRow = (item) => {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.title}</TableCell>
        <TableCell>{item.studentName + ' ' + item.studentSurname}</TableCell>
        <TableCell className='hidden md:table-cell'>{item.score}</TableCell>
        <TableCell className='hidden md:table-cell'>
          {item.teacherName + ' ' + item.teacherSurname}
        </TableCell>
        <TableCell className='hidden md:table-cell'>{item.className}</TableCell>
        <TableCell className='hidden md:table-cell'>
          {new Date(item.date).toLocaleDateString('en-IN')}
        </TableCell>
        <TableCell className='table-cell'>
          {(role === 'admin' || role === 'teacher') && (
            <div className='flex gap-2'>
              <FormContainer type='update' data={item} table='results' />
              <FormContainer type='delete' id={item.id} table='results' />
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
            <TableSort />
            {(role === 'admin' || role === 'teacher') && (
              <FormContainer type='create' table='results' />
            )}
          </div>
        </div>
      </div>
      <div className=''>
        {/* Table */}
        <TableComponent columns={columns} data={data} renderRow={renderRow} />
        {/* Pagination */}
        <PaginationComponent page={p} count={count} />
      </div>
    </div>
  )
}

export default ResultListPage
