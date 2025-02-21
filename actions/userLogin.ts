"use server"

import { UserLoginDocument } from "@/interfaces/UserLogin";
import { connectDB } from "@/lib/mongodb";
import UserLogin from "@/models/UserLogin";

import bcrypt from "bcryptjs";

export const createUser = async (values: UserLoginDocument) => {
    const { email, password } = values;

    try {
        await connectDB();

        const userFound = await UserLogin.findOne({ email });
        if(userFound){
            return {
                error: 'Email already exists!'
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserLogin({
            email,
            password: hashedPassword,
        });
        
        await user.save();

    }catch(e){
        console.log(e);
    }
}

export const updateUser = async (values: UserLoginDocument) => {
    const { email, password, resetToken, resetTokenExpiry } = values;

    try {
        await connectDB();
        const userLoginUpdate = await UserLogin.findOne({ email });
        
        userLoginUpdate.email = email || userLoginUpdate.email;
        userLoginUpdate.password = password || userLoginUpdate.password;
        userLoginUpdate.resetToken = resetToken || userLoginUpdate.resetToken;
        userLoginUpdate.resetTokenExpiry = resetTokenExpiry || userLoginUpdate.resetTokenExpiry;
        
        await userLoginUpdate.save();
    } catch(e){
        console.log(e);
    }
}