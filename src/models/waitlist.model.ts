import { Waitlist } from "@/interfaces/waitlist.interface"
import { Schema, model, Document } from "mongoose"

const WaitlistSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
},{
  timestamps: true
})


export const WaitlistModel = model<Waitlist & Document>("Waitlist", WaitlistSchema)