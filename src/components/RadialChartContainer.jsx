import { prisma } from '@/lib/prisma'
import { Card } from './ui/card'
import { RadialChart } from './RadialChart'
import { MoreHorizontal } from 'lucide-react'

const RadialChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ['sex'],
    _count: true,
  })
  const boys = data.find((item) => item.sex === 'MALE')?._count || 0
  const girls = data.find((item) => item.sex === 'FEMALE')?._count || 0
  return (
    <Card className='rounded-2xl h-full'>
      <div className='flex flex-row justify-between items-center p-4'>
        <h1 className='text-lg font-bold'>Students</h1>
        <MoreHorizontal />
      </div>
      <RadialChart boys={boys} girls={girls} />
    </Card>
  )
}

export default RadialChartContainer
