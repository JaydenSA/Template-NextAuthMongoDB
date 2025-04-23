import ProfileButton from '@/app/_components/ProfileButton'
import { Card } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

export default function Navbar() {
  return (
        <Card className='flex justify-between items-center p-2 '>
          <SidebarTrigger className='' />

          <div className='flex gap-2 items-center'>
            <ProfileButton />
          </div>
        </Card>
          )
}
