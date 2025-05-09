import Announcement from '@/components/Announcement'
import { AreaChartComponent } from '@/components/AreaChart'
import { BarChartComponent } from '@/components/BarChart'
import { AppCalendar } from '@/components/Calendar'
import { RadialChart } from '@/components/RadialChart'
import UserCards from '@/components/UserCards'

const Admin = () => {
  return (
    <div>
      <div className='flex flex-col gap-4 p-5 md:flex-row'>
        {/* LEFT */}
        <div className='w-full lg:w-2/3 md:w-1/2 flex flex-col gap-8'>
          <div className='flex justify-between gap-4 flex-wrap'>
            {/* User cards */}
            <UserCards type='Student' />
            <UserCards type='Teacher' />
            <UserCards type='Parent' />
            <UserCards type='Staff' />
          </div>
          {/* dual charts */}
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='w-full lg:w-1/3 h-[450px] '>
              <RadialChart />
            </div>
            <div className='w-full lg:w-2/3 h-[450px]'>
              <BarChartComponent />
            </div>
          </div>
          <div>
            <AreaChartComponent />
          </div>
        </div>
        <div className='w-full lg:w-1/3 md:w-1/2'>
          {/* Right */}
          <div className='bg-card mb-4 p-4 rounded-xl'>
            <h1 className='text-foreground font-xl font-bold mb-2'>
              Events Calender
            </h1>
            <AppCalendar />
          </div>
          <div className='bg-card mb-4 p-4 rounded-xl'>
            <Announcement />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
