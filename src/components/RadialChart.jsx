'use client'
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export function RadialChart({ boys, girls }) {
  const data = [
    {
      name: 'Total',
      no: boys + girls,
      fill: '#3f46e5',
    },
    {
      name: 'Boys',
      no: boys,
      fill: 'var(--color-chart-1)',
    },
    {
      name: 'Girls',
      no: girls,
      fill: 'var(--color-chart-4)',
    },
  ]
  return (
    <div className='w-full relative h-[75%]'>
      <ResponsiveContainer>
        <RadialBarChart
          cx='50%'
          cy='50%'
          innerRadius='40%'
          outerRadius='100%'
          barSize={32}
          data={data}>
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey='no'
          />
          <Legend iconSize={10} layout='horizontal' verticalAlign='bottom' />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
