import { UserProfileDocument } from "@/database/interfaces/UserProfile";
import  mongoose, { Schema, model } from  "mongoose";

const UserProfileSchema = new Schema<UserProfileDocument>({
    user_email: {
      type: String,
      unique: true,
      required: [true, "User email is required"],
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    image: {
      type: String, // not required as a default is added
    },
    phone_number: {
      type: String, 
    },
  },
  {
    timestamps: true,
  }
);

const  UserProfile  =  mongoose.models?.UserProfile  ||  model<UserProfileDocument>('UserProfile', UserProfileSchema);
export  default  UserProfile;