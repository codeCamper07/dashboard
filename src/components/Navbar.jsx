'use client'

import { Moon, Sun } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { SidebarTrigger } from './ui/sidebar'
import { UserButton, useUser } from '@clerk/nextjs'
import { Skeleton } from './ui/skeleton'

function Navbar() {
  const { theme, setTheme } = useTheme()
  const { user } = useUser()

  return (
    <div className='p-4 flex items-center justify-between'>
      {/*Left Items */}
      <SidebarTrigger />
      <div className='flex items-center gap-4'>
        {/* Right Items */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon'>
              <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user ? (
          <div className='flex flex-col'>
            <h1 className='font-medium text-md'>{`${user?.firstName} ${user?.lastName}`}</h1>
            <p className='text-xs text-right'>{user?.publicMetadata.role}</p>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-15 rounded-md' />
            <Skeleton className='h-3 w-12 rounded-md ml-3' />
          </div>
        )}

        {user ? (
          <UserButton />
        ) : (
          <Skeleton className='h-10 w-10 rounded-full' />
        )}

        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User2 className='h-[1.2rem] w-[1.2rem] mr-2' /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings2 className='h-[1.2rem] w-[1.2rem] mr-2' /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant='destructive'>
              <LogOutIcon className='h-[1.2rem] w-[1.2rem] mr-2' /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  )
}

export default Navbar
