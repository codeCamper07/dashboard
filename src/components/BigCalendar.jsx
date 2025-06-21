'use client'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'

const localizer = momentLocalizer(moment)

const BigCalendar = ({ data }) => {
  const [view, setView] = useState(Views.WORK_WEEK)
  const handleViewChange = (newView) => {
    setView(newView)
  }

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor='start'
      endAccessor='end'
      views={['work_week', 'day']}
      view={view}
      style={{ height: '98%' }}
      onView={handleViewChange}
      min={new Date(2025, 6, 16, 8, 0)}
      max={new Date(2025, 6, 20, 17, 0)}
    />
  )
}

export default BigCalendar
