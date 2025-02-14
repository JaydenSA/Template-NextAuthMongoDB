"use server"
import { UserDocument, UserInputs } from "@/interfaces/User";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: UserInputs) => {
    const { email, password, name, surname } = values;

    try {
        await connectDB();

        const userFound = await User.findOne({ email });
        if(userFound){
            return {
                error: 'Email already exists!'
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            surname,
            email,
            password: hashedPassword,
            username: email.substring(0, email.indexOf("@")),
            image: "https://avatar.iran.liara.run/public"
        });
        
        await user.save();

    }catch(e){
        console.log(e);
    }
}

export const update = async (values: UserDocument) => {
    const { email, username, image, name, surname, password } = values;

    try {
        await connectDB();
        const userUpdate = await User.findOne({ email });
        
        userUpdate.email = email || userUpdate.email;
        userUpdate.username = username || userUpdate.username;
        userUpdate.image = image || userUpdate.image;
        userUpdate.name = name || userUpdate.name;
        userUpdate.surname = surname || userUpdate.surname;
        userUpdate.password = password || userUpdate.password;
        
        await userUpdate.save();
    } catch(e){
        console.log(e);
    }
}

export const getUser = async (email: string) => {
    try {
        await connectDB();
        const user = await User.findOne({ email });
        return user;
    } catch(e){
        console.log(e);
    }
}