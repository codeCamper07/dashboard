'use client'

import { LogOutIcon, Moon, Settings2, Sun, User2 } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { SidebarTrigger } from './ui/sidebar'
import { UserButton } from '@clerk/nextjs'

function Navbar() {
  const { theme, setTheme } = useTheme()
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

        <UserButton />

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
