import { IsEmail, IsString, Length } from "class-validator"


export class ResendOTPDto {
  @IsEmail()
  email!: string
}