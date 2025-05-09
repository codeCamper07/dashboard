'use client'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'

const localizer = momentLocalizer(moment)

const myEventsList = [
  {
    title: 'Math',
    allDay: false,
    start: new Date(2025, 4, 5, 8, 0),
    end: new Date(2025, 4, 5, 8, 45),
  },
  {
    title: 'English',
    allDay: false,
    start: new Date(2025, 4, 5, 9, 0),
    end: new Date(2025, 4, 5, 9, 45),
  },
  {
    title: 'Biology',
    allDay: false,
    start: new Date(2025, 4, 5, 10, 0),
    end: new Date(2025, 4, 5, 10, 45),
  },
  {
    title: 'Physics',
    allDay: false,
    start: new Date(2025, 4, 5, 11, 0),
    end: new Date(2025, 4, 5, 11, 45),
  },
  {
    title: 'Chemistry',
    allDay: false,
    start: new Date(2025, 4, 5, 13, 0),
    end: new Date(2025, 4, 5, 13, 45),
  },
  {
    title: 'History',
    allDay: false,
    start: new Date(2025, 4, 5, 14, 0),
    end: new Date(2025, 4, 5, 14, 45),
  },
  {
    title: 'English',
    allDay: false,
    start: new Date(2025, 4, 6, 9, 0),
    end: new Date(2025, 4, 6, 9, 45),
  },
  {
    title: 'Biology',
    allDay: false,
    start: new Date(2025, 4, 6, 10, 0),
    end: new Date(2025, 4, 6, 10, 45),
  },
  {
    title: 'Physics',
    allDay: false,
    start: new Date(2025, 4, 6, 11, 0),
    end: new Date(2025, 4, 6, 11, 45),
  },

  {
    title: 'History',
    allDay: false,
    start: new Date(2025, 4, 6, 14, 0),
    end: new Date(2025, 4, 6, 14, 45),
  },
  {
    title: 'Math',
    allDay: false,
    start: new Date(2025, 4, 7, 8, 0),
    end: new Date(2025, 4, 7, 8, 45),
  },
  {
    title: 'Biology',
    allDay: false,
    start: new Date(2025, 4, 7, 10, 0),
    end: new Date(2025, 4, 7, 10, 45),
  },

  {
    title: 'Chemistry',
    allDay: false,
    start: new Date(2025, 4, 7, 13, 0),
    end: new Date(2025, 4, 7, 13, 45),
  },
  {
    title: 'History',
    allDay: false,
    start: new Date(2025, 4, 7, 14, 0),
    end: new Date(2025, 4, 7, 14, 45),
  },
  {
    title: 'English',
    allDay: false,
    start: new Date(2025, 4, 8, 9, 0),
    end: new Date(2025, 4, 8, 9, 45),
  },
  {
    title: 'Biology',
    allDay: false,
    start: new Date(2025, 4, 8, 10, 0),
    end: new Date(2025, 4, 8, 10, 45),
  },
  {
    title: 'Physics',
    allDay: false,
    start: new Date(2025, 4, 8, 11, 0),
    end: new Date(2025, 4, 8, 11, 45),
  },

  {
    title: 'History',
    allDay: false,
    start: new Date(2025, 4, 8, 14, 0),
    end: new Date(2025, 4, 8, 14, 45),
  },
  {
    title: 'Math',
    allDay: false,
    start: new Date(2025, 4, 9, 8, 0),
    end: new Date(2025, 4, 9, 8, 45),
  },
  {
    title: 'English',
    allDay: false,
    start: new Date(2025, 4, 9, 9, 0),
    end: new Date(2025, 4, 9, 9, 45),
  },

  {
    title: 'Physics',
    allDay: false,
    start: new Date(2025, 4, 9, 11, 0),
    end: new Date(2025, 4, 9, 11, 45),
  },
  {
    title: 'Chemistry',
    allDay: false,
    start: new Date(2025, 4, 9, 13, 0),
    end: new Date(2025, 4, 9, 13, 45),
  },
  {
    title: 'History',
    allDay: false,
    start: new Date(2025, 4, 9, 14, 0),
    end: new Date(2025, 4, 9, 14, 45),
  },
]

const BigCalendar = () => {
  const [view, setView] = useState(Views.WORK_WEEK)
  const handleViewChange = (newView) => {
    setView(newView)
  }

  return (
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor='start'
      endAccessor='end'
      views={['work_week', 'day']}
      view={view}
      style={{ height: '98%' }}
      onView={handleViewChange}
      min={new Date(2025, 4, 12, 8, 0)}
      max={new Date(2025, 4, 12, 17, 0)}
    />
  )
}

export default BigCalendar
