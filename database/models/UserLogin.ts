import { UserLoginDocument } from "@/database/interfaces/UserLogin";
import  mongoose, { Schema, model } from  "mongoose";

const UserLoginSchema = new Schema<UserLoginDocument>({
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true
    },
    resetToken: {
      type: String,
      required: false
    },
    resetTokenExpiry: {
      type: Date,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

const  UserLogin  =  mongoose.models?.UserLogin  ||  model<UserLoginDocument>('UserLogin', UserLoginSchema);
export  default  UserLogin;