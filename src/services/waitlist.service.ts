import { Waitlist } from "@interfaces/waitlist.interface";
import { WaitlistModel } from "@models/waitlist.model";
import { emailService } from "@utils/email_worker";

export class WaitlistService {
  public addToWaitlist$ = async (email: string) => {

    let existingWaitlistUser: Waitlist|null = await WaitlistModel.findOne({ email: email })

    if(existingWaitlistUser != null) throw new Error(`400|Email already added to waitlist.|`)

    let waitlist = new WaitlistModel({ email })

    if(await waitlist.save()){
      return await emailService.sendMail({ email }, "waitlist")
    }else{
      return false
    }
    
  };
}