import { getUserProfile } from "@/database/actions/userProfile";
import { UserProfileDocument } from "@/database/interfaces/User";
import { getServerSession } from "next-auth";
import React from "react";
import ProfileForm from "./_component/ProfileForm";

export default async function page() {
  const session = await getServerSession();
  let userDetails: UserProfileDocument = {
    user_email: "",
    first_name: "",
    last_name: "",
    image: "",
    phone_number: "",
  };

  if (session?.user?.email) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userDetails = await getUserProfile(session.user.email);
  }

  return (
    <div>
      <ProfileForm user={JSON.parse(JSON.stringify(userDetails))}/>
    </div>
  );
}
