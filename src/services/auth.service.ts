import { Login, User } from "@/interfaces/user.interface"
import { UserModel } from "@/models/user.model"
import { generateCurrentTime } from "@/utils/current_time_generator"
import { emailService } from "@/utils/email_worker"
import { generateOTP } from "@/utils/otp_generator"
import { password } from "@/utils/password_hasher"
import { HttpException } from "@/middlewares/error.middleware"
import moment from "moment"

export class AuthService {
  private checkDuplicateUser = async (fields: Array<string>[], type: 'findByField' | string) => {
    const handleBadRequestException = (e: string) => {
        throw new HttpException(`400|${e}.|`)
    }

    if (type == 'findByField') {
        for(let i = 0; i < fields.length; i++){
            let field = fields[i][0]
            let value = fields[i][1]
            let userExists: User | null = await UserModel.findOne({[field]: value})
            if (userExists != null){
                handleBadRequestException(`User with this ${field} - ${value} - already exists`)
            }
        }
    }

  }

  public sendOTP$ = async (email: string, otp: string) => {
    return await emailService.sendMail({ email, otp }, "otp")
  }

  public resendOTP$ = async (email: string) => {
    let user: User|null = await UserModel.findOne({ email })
    if(user==null) throw new HttpException(`400|Email doesn't exist.|`)
    let otp = generateOTP()
    let otpExpiration = moment().add(15, 'minutes')
    if(await emailService.sendMail({ email, otp }, "otp")){
      await UserModel.findOneAndUpdate({ email }, { otp, otpExpiration }, { new: true })
    }
  }

  public verifyEmail$ = async (email: string, otp: string) => {
    let user: User | null = await UserModel.findOne({ email })
    if(user==null) throw new Error(`400|Email doesn't exist.|`)
    if(user.otp != otp) throw new Error(`400|Incorrect Otp.|`)
    if(user.isVerified) throw new Error(`400|Email has already been verified.|`)

    if(moment().isAfter(user?.otpExpiration)){
      throw new HttpException(`400|OTP has Expired.|`)
    }else{
      if(await emailService.sendMail({ email }, "email verification")){
        let updateduser = await UserModel.findOneAndUpdate({ email }, { isVerified: true, isActive: true }, { new: true })
        return updateduser
      }else{
        throw new HttpException(`500|An Error Occurred.|`)
      }
    }
  }

  public logIn$ = async (data: Login) => {
    let user: User | null = await UserModel.findOne({ email: data.email })
    if(user==null) throw new HttpException(`400|User not found.|`)
    if(!await password.verify(user.password, data.password)) throw new Error(`400|Password Incorrect.|`)
    if(await emailService.sendMail({ email: data.email, name: user.name, currentTime: generateCurrentTime() }, "login")){
      return user
    }else{
      return null
    }
  }

  public completeSignUp = async (step: number, data: User) => {

    if(step == 1) {
      let otp = generateOTP()
      await this.checkDuplicateUser([["email", data.email]], 'findByField')
      data.password = await password.hash(data.password)
      data.stepNo = 1
      data.name = 'blank'
      data.creatorLink = 'blank'
      data.isVerified = false
      data.isActive = false
      data.otp = otp
      data.otpExpiration = moment().add(15, 'minutes')
      let user = new UserModel(data)

      if(await emailService.sendMail({ email: data.email, otp }, "otp")){
        await user.save()
        return await UserModel.findOne({ email: data.email }).select('-otp')
      }else{
        return null
      }


      // return user
    }

    if(step == 2){
      let user: User|null = await UserModel.findOne({ email: data.email })

      //@ts-ignore
      if(user.stepNo < 1) throw new HttpException(`400|Complete SignUp Step One.|`)
      if(!user?.isVerified) throw new HttpException(`400|Verify Email First. Check Email for Otp.`)

      if(user == null) throw new HttpException(`400|Email doesn't exist.|`)
      data.stepNo = 2
      let updatedUser = await UserModel.findOneAndUpdate({ email: data.email }, data, { new: true })
      return updatedUser
    }
  }

}