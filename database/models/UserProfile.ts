import { UserProfileDocument } from "@/database/interfaces/User";
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
    email_notifications: {
      type: Boolean,
      default: false,
    },
    marketing_promotions: {
      type: Boolean,
      default: false,
    },
    language_section: {
      type: String,
      default: "en",
    },
  },
  {
    timestamps: true,
  }
);

const  UserProfile  =  mongoose.models?.UserProfile  ||  model<UserProfileDocument>('UserProfile', UserProfileSchema);
export  default  UserProfile;