import AppSidebar from '@/components/AppSideBar'
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <div className='h-screen flex'>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <div className='w-full'>
          <Navbar />
          <div className='bg-secondary overflow-scroll flex flex-col h-[90%]'>
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
