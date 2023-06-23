import * as argon2 from "argon2"

class PasswordHasherAndVerifier {

  constructor(){

  }

  public async verify(hash: string, password: string){
    return await argon2.verify(hash, password)
  }

  public async hash(password: string){
    return await argon2.hash(password, { saltLength: 10 })
  }


}

export const password = new PasswordHasherAndVerifier()