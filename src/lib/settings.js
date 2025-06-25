export const ITEMS_PER_PAGE = 5

export const routeAccessMap = {
  '/admin(.*)': ['admin'],
  '/teacher(.*)': ['teacher'],
  '/student(.*)': ['student'],
  '/parent(.*)': ['parent'],
  '/list/teachers': ['admin', 'teacher'],
  '/list/students': ['admin', 'teacher'],
  '/list/parents': ['admin', 'teacher'],
  '/list/subjects': ['admin'],
  '/list/classes': ['admin', 'teacher'],
  'list/exams': ['admin', 'teacher', 'student', 'parent'],
  'list/results': ['admin', 'teacher', 'student', 'parent'],
  'list/assignments': ['admin', 'teacher', 'student', 'parent'],
  'list/attendance': ['admin', 'teacher', 'student', 'parent'],
  'list/events': ['admin', 'teacher', 'student', 'parent'],
  'list/announcements': ['admin', 'teacher', 'student', 'parent'],
  '/list/grades': ['admin'],
}

const getLatestMonday = () => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const latestMonday = today
  latestMonday.setDate(today.getDate() - daysSinceMonday)
  return latestMonday
}

export const adjustScheduleToCurrentWeek = (lessons) => {
  const latestMonday = getLatestMonday()

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay()

    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1

    const adjustedStartDate = new Date(latestMonday)

    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday)
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds(),
    )
    const adjustedEndDate = new Date(adjustedStartDate)
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds(),
    )

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    }
  })
}
