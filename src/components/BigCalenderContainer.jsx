import { prisma } from '@/lib/prisma'
import BigCalendar from './BigCalendar'
import { adjustScheduleToCurrentWeek } from '@/lib/settings'

const BigCalenderContainer = async ({ type, id }) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === 'teacherId' ? { teacherId: id } : { classId: id }),
    },
  })
  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }))
  const schedule = adjustScheduleToCurrentWeek(data)

  return <BigCalendar data={data} />
}

export default BigCalenderContainer
