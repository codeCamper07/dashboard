import Announcement from '@/components/Announcement'
import { AreaChartComponent } from '@/components/AreaChart'
import BarChartContainer from '@/components/BarChartContainer'
import EventCalenderContainer from '@/components/EventCalenderContainer'
import RadialChartContainer from '@/components/RadialChartContainer'
import UserCards from '@/components/UserCards'

const Admin = ({ searchParams }) => {
  return (
    <div>
      <div className='flex flex-col gap-4 p-5 md:flex-row'>
        {/* LEFT */}
        <div className='w-full lg:w-2/3 md:w-1/2 flex flex-col gap-8'>
          <div className='flex justify-between gap-4 flex-wrap'>
            {/* User cards */}
            <UserCards type='admin' />
            <UserCards type='student' />
            <UserCards type='teacher' />
            <UserCards type='parent' />
          </div>
          {/* dual charts */}
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='w-full lg:w-1/3 h-[450px] '>
              <RadialChartContainer />
            </div>
            <div className='w-full lg:w-2/3 h-[450px]'>
              <BarChartContainer />
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
            <EventCalenderContainer searchParams={searchParams} />
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
