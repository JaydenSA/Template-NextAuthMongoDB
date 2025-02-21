import { Button } from '@/components/ui/button'

import { UserProfileDocument } from '@/interfaces/UserProfile';
import { getUserProfile } from '@/actions/userProfile';

import { getServerSession } from 'next-auth';
import Link from 'next/link'

export default async function page() {
  const session = await getServerSession();
  
  let userDetails : UserProfileDocument = ({
    user_email: "",
    first_name: "",
    last_name: "",
    image: "",
    phone_number: "",
  });

  if (session?.user?.email) {
    userDetails = await getUserProfile(session.user.email);
    // getting user profile will check if it exists and if not will create the necessary profile. 
  }
  
  return (
    <div className='flex flex-col gap-6 items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>Welcome! {userDetails.user_email}</h1>
      <Button>
        <Link href={"/app/overview"}> Continue to Dashboard</Link>
      </Button>
    </div>
  )
}
