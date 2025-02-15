import ProfileButton from '@/app/_components/_micro/ProfileButton'
import { Card } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

export default function Navbar() {
  return (
        <Card className='flex justify-between items-center p-2 bg-white'>
          <SidebarTrigger />
          <ProfileButton />
        </Card>
          )
}
