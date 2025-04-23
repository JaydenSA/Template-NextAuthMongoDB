"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateUserProfile } from "@/database/actions/userProfile";
import { UserProfileDocument } from "@/database/interfaces/User";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

interface ProfileFormProps {
  user: UserProfileDocument;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const { data: session } = useSession();

  const handleSubmit = async (formData: FormData) => {
    const res = await updateUserProfile({
      user_email: session?.user?.email || "",
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      image: "https://avatar.iran.liara.run/public",
      phone_number: formData.get("phone_number") as string,
    });

    console.log("Going through submit" + res);
    toast.success("Profile updated successfully");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Profile</h2>
      <p className=" font-thin text-gray-400 text-sm">
        This is how others will see you on the site.
      </p>

      <Separator className="my-4" />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleSubmit(formData);
        }}
      >
        <div className="flex justify-between flex-col md:flex-row pb-4 gap-4">
          <div className="flex gap-4 items-center">
            <Image
              src={user?.image || "https://avatar.iran.liara.run/public"}
              alt="profile-picture-current"
              height={100}
              width={100}
              className="rounded-full w-[100px] h-[100px]"
            />

            <div className="flex flex-col gap-2 ">
              <p>Profile Picture</p>
              <p>PNG, JPEG under 3MB</p>
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Input id="image" name="image" type="file" className="w-auto" />
            <Button>Delete</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className=" col-span-1">
            <Label htmlFor="first_name" className="font-regular">
              First Name
            </Label>
            <Input
              type="text"
              name="first_name"
              aria-label="first_name"
              className="my-2"
              defaultValue={user?.first_name}
              placeholder="John"
            />
          </div>

          <div className=" col-span-1">
            <Label htmlFor="lastName" className="font-regular">
              Last Name
            </Label>
            <Input
              type="text"
              name="last_name"
              aria-label="last_name"
              className="my-2"
              defaultValue={user?.last_name}
              placeholder="Smith"
            />
          </div>
        </div>

        <Separator className="my-4" />

        <h3 className="text-md font-semibold">Contact Info</h3>
        <p className=" font-thin text-gray-400 text-sm pb-4">
          Modify your phone number.
        </p>

        <div className="">
          <Label htmlFor="username" className="font-regular">
            Phone Number
          </Label>
          <Input
            type="text"
            name="phone_number"
            aria-label="phone_number"
            className="my-2"
            defaultValue={user?.phone_number}
            placeholder="012 456 7894"
          />
        </div>

        <Button type="submit" className="mt-4">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
