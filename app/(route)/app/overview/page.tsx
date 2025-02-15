"use client"

import { userProfile } from "@/interfaces/User";
import { getUser } from "@/actions/user";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const { data: session } = useSession()
    
  const userDetails = React.useRef<userProfile>({
      email: "",
      name: "",
      surname: "",
      image: "",
    });

  React.useEffect(() => {
      const fetchUserDetails = async () => {
          if (session?.user?.email) {
              userDetails.current = await getUser(session.user.email as string);
          }
          console.log(userDetails.current);
      };
      fetchUserDetails();
  }, [userDetails.current]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 gap-4">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Hi {userDetails.current.name} </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
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
