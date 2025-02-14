import ProfileButton from '@/app/_components/_micro/ProfileButton'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

export default function Navbar() {
  return (
    <div className='flex justify-between items-center p-2'>
        <SidebarTrigger />
        <ProfileButton />
    </div>
  )
}
