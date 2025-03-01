import { getUserProfile } from "@/database/actions/userProfile";
import { UserProfileDocument } from "@/database/interfaces/UserProfile";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Home() {
  const session = await getServerSession();
  
  let userDetails : UserProfileDocument = ({
    user_email: "",
    first_name: "",
    last_name: "",
    image: "",
    phone_number: "",
  });

  if (session?.user?.email) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userDetails = await getUserProfile(session.user.email);
    // getting user profile will check if it exists and if not will create the necessary profile. 
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 gap-4">
    </div>
  );
}
