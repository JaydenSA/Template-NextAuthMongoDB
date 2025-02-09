import { UserDocument } from "@/interfaces/User";
import  mongoose, { Schema, model } from  "mongoose";

const UserSchema = new Schema<UserDocument>({
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
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    surname: {
      type: String,
      required: [true, "Surname is required"]
    },
    username: {
      type: String,
      required: [true, "Username is required"]
    },
    image: {
      type: String,
      required: [true, "Image is required"]
    }
  },
  {
    timestamps: true,
  }
);

const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', UserSchema);
export  default  User;