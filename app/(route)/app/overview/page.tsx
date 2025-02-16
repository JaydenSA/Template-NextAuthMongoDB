import { userProfile } from "@/interfaces/User";
import { getUser } from "@/actions/user";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import { getSession } from "next-auth/react";

export default async function Home() {
  let userDetails : userProfile = {
    email: "",
    name: "",
    surname: "",
    image: "",
  };

  const session = await getSession();

  if (session && session.user && session.user.email) {
    console.log("Pulling user details for ", session.user.email);

    userDetails = await getUser(session.user.email);
  }

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 gap-4">
      { userDetails && (
        <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Hi {userDetails.name} </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>

      </Card>
      )}

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam et aliquid laudantium libero modi corporis eius consectetur! Assumenda, consequuntur mollitia eum consequatur vel a sequi consectetur, impedit autem tempora explicabo.</p>
        </CardContent>
      </Card>
    </div>
  );
}
