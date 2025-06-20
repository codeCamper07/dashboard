import { prisma } from '@/lib/prisma'
import { BarChartComponent } from './BarChart'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const BarChartContainer = async () => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysSinceMonday = dayOfWeek === 6 ? 0 : dayOfWeek - 1

  const lastMonday = new Date(today)

  lastMonday.setDate(today.getDate() - daysSinceMonday)

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  })

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const attendanceMap = {
    Mon: { present: 0, abscent: 0 },
    Tue: { present: 0, abscent: 0 },
    Wed: { present: 0, abscent: 0 },
    Thu: { present: 0, abscent: 0 },
    Fri: { present: 0, abscent: 0 },
  }
  resData.forEach((item) => {
    const itemDate = new Date(item.date)
    const dayOfWeek = itemDate.getDay()

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1]

      if (item.present) {
        attendanceMap[dayName].present += 1
      } else {
        attendanceMap[dayName].absent += 1
      }
    }
  })
  const data = daysOfWeek.map((day) => ({
    day: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }))
  const chartConfig = {
    present: {
      label: 'Present',
      color: 'var(--color-chart-1)',
    },
    abscent: {
      label: 'Abscent',
      color: 'var(--color-chart-4)',
    },
  }

  return (
    <Card className='w-full h-full'>
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChartComponent data={data} chartConfig={chartConfig} />
      </CardContent>
    </Card>
  )
}

export default BarChartContainer
