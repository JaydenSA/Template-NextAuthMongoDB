"use server"

import { UserSettingsDocument } from "@/database/interfaces/User";
import { connectDB } from "@/lib/mongodb";
import UserSettings from "@/database/models/UserSettings";

export const createUserSettings = async (values: UserSettingsDocument) => {
    const { user_email, first_name, last_name, phone_number } = values;

    try {
        await connectDB();

        const userSettingsFound = await UserSettings.findOne({ user_email });

        if(userSettingsFound){
            return {
                error: 'User Profile already exists.'
            }
        }

        const user = new UserSettings({
            user_email,
            first_name,
            last_name,
            phone_number,
            image: "https://avatar.iran.liara.run/public"
        });
        
        await user.save();

    } catch(e) {
        console.log("Error: ", e);
    }
}

export const updateUserSettings = async (values: UserSettingsDocument) => {
    const { user_email, first_name, last_name, phone_number } = values;

    try {
        await connectDB();
        const userUpdate = await UserSettings.findOne({ user_email });
        
        userUpdate.user_email = user_email || userUpdate.user_email;
        userUpdate.first_name = first_name || userUpdate.first_name;
        userUpdate.last_name = last_name || userUpdate.last_name;
        userUpdate.phone_number = phone_number || userUpdate.phone_number;
        
        await userUpdate.save();
    } catch(e){
        console.log(e);
    }
}

export const getUserSettings = async (user_email: string) => {
    try {
        await connectDB();
        
        const userSettingsFound = await UserSettings.findOne({ user_email });

        if(userSettingsFound === null){
            const userCreated = await createUserSettings({
                user_email: user_email,
                first_name: "",
                last_name: "",
                image: "https://avatar.iran.liara.run/public",
                phone_number: ""
            })

            return userCreated;
        }
        
        return userSettingsFound;
    } catch(e){
        console.log(e);
    }
}