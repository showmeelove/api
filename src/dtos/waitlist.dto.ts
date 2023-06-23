import { IsEmail, IsString } from "class-validator"

export class WaitlistDto {
  @IsEmail()
  email!: string
}