'use client'
import { MoreHorizontal } from 'lucide-react'
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Card } from './ui/card'

const data = [
  {
    name: 'Total',
    no: 1000,
    fill: 'var(--color-accent)',
  },
  {
    name: 'Boys',
    no: 500,
    fill: 'var(--color-chart-1)',
  },
  {
    name: 'Girls',
    no: 500,
    fill: 'var(--color-chart-4)',
  },
]

export function RadialChart() {
  return (
    <Card className='rounded-2xl h-full'>
      <div className='flex flex-row justify-between items-center p-4'>
        <h1 className='text-lg font-bold'>Students</h1>
        <MoreHorizontal />
      </div>
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
    </Card>
  )
}
