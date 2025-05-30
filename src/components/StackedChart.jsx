'use client'

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
const chartData = [{ Group_A: 92, Group_B: 8 }]

const chartConfig = {
  Group_A: {
    label: 'Group_A',
    color: 'var(--chart-1)',
  },
  Group_B: {
    label: 'Group_B',
    color: 'var(--chart-2)',
  },
}

export function StackedChart() {
  const totalVisitors = chartData[0].Group_A + chartData[0].Group_B

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Performance</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-1 items-center pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square w-full max-w-[250px]'>
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}>
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className='fill-foreground text-2xl font-bold'>
                          9.2
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className='fill-muted-foreground'>
                          of Max 10
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey='Group_B'
              stackId='a'
              cornerRadius={5}
              fill='var(--color-Group_B)'
              className='stroke-transparent stroke-2'
            />
            <RadialBar
              dataKey='Group_A'
              fill='var(--color-Group_A)'
              stackId='a'
              cornerRadius={5}
              className='stroke-transparent stroke-2'
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <h3>1st Semester-2nd Semester</h3>
      </CardFooter>
    </Card>
  )
}
