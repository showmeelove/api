
//@ts-ignore
import Verifier from "email-verifier"
import { WHOISKEY } from "@/config"


const verifier = new Verifier(WHOISKEY)

const checkOptions = {
  checkCatchAll: false,
  checkDisposable: false,
  checkFree: false,
  validateDNS: false,
  validateSMTP: false
}

class EmailVerifier{

  constructor(){

  }

  public async VerifyEmail(email: string) {
    return new Promise<boolean>((resolve, reject) => {
      verifier.verify(email, checkOptions, (err: any, response: any) => {
        if (err) {
          console.error('An error occurred:', err);
          resolve(false);
        } else {
          const status = response.dnsCheck === 'true';
          resolve(status);
        }
      });
    });
  }

}

export const emailVerifier = new EmailVerifier()