import { IsString, MaxLength, Matches, MinLength } from "class-validator"

export default class LoginUserDTO {
    @IsString({message: 'Обязательное поле'})
    @MaxLength(256, {message: 'Максимальная длина электронной почты - 256 символов'})
    @Matches( 'Допускаются символы: [a-z0-9]+@[a-z]+.[a-z]{2,3}')
    public mail!: string
    @IsString({message: 'Обязательное поле'})
    @MinLength(6,{message: 'Минимальная длина пароля - 6 символов'})
    @MaxLength(12,{message: 'Максимальная длина пароля - 12 символов'})
    public password!: string
}