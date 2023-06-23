import { IsEmail, IsOptional, IsString, Length, Matches } from "class-validator"


export class UserSignUpStep1Dto {
  @IsEmail()
  email!: string

  @IsString()
  @Length(6)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/, {
    message: 'Password must contain at least one letter, one number, and one symbol'
  })
  password!: string
}

export class UserSignUpStep2Dto {
  @IsEmail()
  email!: string

  @IsString()
  name!: string

  @IsString()
  creatorLink!: string

  @IsOptional()
  @IsString()
  socialLink!: string

  @IsOptional()
  @IsString()
  bio!: string
}

export class UserSignInDto {
  @IsEmail()
  email!: string

  @IsString()
  password!: string
}

export class VerifyEmailDto {
  @IsEmail()
  email!: string

  @IsString()
  @Length(6, 6)
  otp!: string
}