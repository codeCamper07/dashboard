'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export function BarChartComponent({ data, chartConfig }) {
  return (
    <ChartContainer className='xl:max-h-[365px]' config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='day'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey='present' fill='var(--color-present)' radius={4} />
        <Bar dataKey='abscent' fill='var(--color-abscent)' radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
