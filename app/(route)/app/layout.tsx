import React from "react";

import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from './_components/Navbar';
import SideBar from "./_components/SideBar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
    style={{
      "--sidebar-width": "15rem",
      "--sidebar-width-mobile": "15rem",
    } as React.CSSProperties}>
      <SideBar />
      <div className='w-full p-2 md:p-4 bg-gray-200'>
        <Navbar/>
        {children}
      </div>
    </SidebarProvider>
  )
}