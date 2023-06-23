import { User } from "@/interfaces/user.interface";
import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean
  },
  isActive: {
    type: Boolean
  },
  lastLogin: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  creatorLink: {
    type: String,
    required: true,
    unique: true
  },
  socialLink: {
    type: String
  },
  bio: {
    type: String
  },
  profileImage: {
    type: String
  },
  stepNo: {
    type: Number
  },
  otp: {
    type: String,
  },
  otpExpiration: {
    type: Date
  },
  token: {
    type: String
  }
}, {
  timestamps: true
})

export const UserModel = model<User & Document>("User", UserSchema)