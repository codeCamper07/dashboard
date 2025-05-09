'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card } from './ui/card'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--color-chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--color-chart-4)',
  },
}

export function AreaChartComponent() {
  return (
    <Card>
      <ChartContainer config={chartConfig} className='min-h-[100px] w-full p-2'>
        <h1 className='text-foreground font-medium mb-3'>Total Visitors</h1>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={true} tickMargin={10} axisLine={true} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <defs>
            <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
              <stop
                offset='5%'
                stopColor='var(--color-desktop)'
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor='var(--color-desktop)'
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
              <stop
                offset='5%'
                stopColor='var(--color-mobile)'
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor='var(--color-mobile)'
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey='mobile'
            type='natural'
            fill='url(#fillMobile)'
            fillOpacity={0.4}
            stroke='var(--color-mobile)'
            stackId='a'
          />
          <Area
            dataKey='desktop'
            type='natural'
            fill='url(#fillDesktop)'
            fillOpacity={0.4}
            stroke='var(--color-desktop)'
            stackId='a'
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  )
}
