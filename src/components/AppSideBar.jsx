import {
  University,
  Home,
  Users,
  ContactRound,
  SquareLibrary,
  LaptopMinimalCheck,
  NotebookPen,
  BookText,
  ListTodo,
  FileCheck2,
  Megaphone,
  CalendarHeart,
  ListOrdered,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { currentUser } from '@clerk/nextjs/server'

// Menu items.

const AppSidebar = async () => {
  const user = await currentUser()
  const role = user?.publicMetadata.role

  const items = [
    {
      title: 'Home',
      url: `/${role}`,
      icon: Home,
      visible: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      title: 'Students',
      url: '/list/students',
      icon: Users,
      visible: ['admin', 'teacher'],
    },
    {
      title: 'Teachers',
      url: '/list/teachers',
      icon: University,
      visible: ['admin', 'teacher'],
    },
    {
      title: 'Parents',
      url: '/list/parents',
      icon: ContactRound,
      visible: ['admin', 'teacher'],
    },
    {
      title: 'Subjects',
      url: '/list/subjects',
      icon: SquareLibrary,
      visible: ['admin'],
    },
    {
      title: 'Classes',
      url: '/list/classes',
      icon: LaptopMinimalCheck,
      visible: ['admin', 'teacher'],
    },
    {
      title: 'Lessons',
      url: '/list/lessons',
      icon: NotebookPen,
      visible: ['admin', 'teacher'],
    },
    {
      title: 'Grades',
      url: '/list/grades',
      icon: ListOrdered,
      visible: ['admin'],
    },
    {
      title: 'Exam',
      url: '/list/exams',
      icon: BookText,
      visible: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      title: 'Assignments',
      url: '/list/assignments',
      icon: ListTodo,
      visible: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      title: 'Results',
      url: '/list/results',
      icon: FileCheck2,
      visible: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      title: 'Events',
      url: '/list/events',
      icon: CalendarHeart,
      visible: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      title: 'Announcements',
      url: '/list/announcements',
      icon: Megaphone,
      visible: ['admin', 'teacher', 'student', 'parent'],
    },
  ]

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/${role}`}>
                <Image src='/school.png' width={30} height={30} alt='logo' />
                <span>H-School</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.visible.includes(role)) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton tooltip={item.title} asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar
