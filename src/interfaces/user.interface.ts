import { Moment } from "moment"

export interface User {
  _id?: string
  email: string
  password: string
  isVerified: boolean
  isActive: boolean
  lastLogin: string
  name: string
  creatorLink: string
  socialLink: string
  bio: string
  profileImage: string
  stepNo: number,
  otp: string
  otpExpiration: Moment
  token: string
}


export interface VerifyEmail {
  email: string
  otp: string
}

export interface Login {
  email: string
  password: string
}