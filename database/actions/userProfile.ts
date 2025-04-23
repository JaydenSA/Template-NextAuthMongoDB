"use server"

import { UserProfileDocument } from "@/database/interfaces/User";
import { connectDB } from "@/lib/mongodb";
import UserProfile from "@/database/models/UserProfile";

export const createUserProfile = async (values: UserProfileDocument) => {
    const { user_email, first_name, last_name, phone_number } = values;

    try {
        await connectDB();

        const userProfileFound = await UserProfile.findOne({ user_email });

        if(userProfileFound){
            return {
                error: 'User Profile already exists.'
            }
        }

        const user = new UserProfile({
            user_email,
            first_name,
            last_name,
            phone_number,
            image: "https://avatar.iran.liara.run/public",
            email_notifications: false,
            marketing_promotions: false,
            language_section: "en"
        });
        
        await user.save();

    } catch(e) {
        console.log("Error: ", e);
    }
}

export const updateUserProfile = async (values: UserProfileDocument) => {
    const { user_email, first_name, last_name, phone_number, image, email_notifications, marketing_promotions, language_section } = values;

    try {
        await connectDB();
        const userUpdate = await UserProfile.findOne({ user_email });
        
        userUpdate.user_email = user_email || userUpdate.user_email;
        userUpdate.first_name = first_name || userUpdate.first_name;
        userUpdate.last_name = last_name || userUpdate.last_name;
        userUpdate.phone_number = phone_number || userUpdate.phone_number;
        userUpdate.image = image || userUpdate.image;
        userUpdate.email_notifications = email_notifications || userUpdate.email_notifications;
        userUpdate.marketing_promotions = marketing_promotions || userUpdate.marketing_promotions;
        userUpdate.language_section = language_section || userUpdate.language_section;
        
        await userUpdate.save();
    } catch(e){
        console.log(e);
    }
}

export const getUserProfile = async (user_email: string) => {
    try {
        await connectDB();
        
        const userProfileFound = await UserProfile.findOne({ user_email });

        if(userProfileFound === null){
            const userCreated = await createUserProfile({
                user_email: user_email,
                first_name: "",
                last_name: "",
                image: "https://avatar.iran.liara.run/public",
                phone_number: "",
                email_notifications: false,
                marketing_promotions: false,
                language_section: "en"
            })

            return userCreated;
        }
        
        return userProfileFound;
    } catch(e){
        console.log(e);
    }
}