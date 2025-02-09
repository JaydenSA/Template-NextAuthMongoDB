"use client"

import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SignOutButton() {
  return (
    <button className='cursor-pointer'
        onClick={() => {
            signOut({ redirect: false }).then(() => {
                redirect('/');
            });
        }}
        >
        Sign Out
    </button>
  )
}
