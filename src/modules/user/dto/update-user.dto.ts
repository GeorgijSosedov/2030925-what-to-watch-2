import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export default class UpdateUserDTO {
    @IsString({message: 'Аватар загружен'})
    @MaxLength(256, {message: 'Слишком коротко для поля «image»'})
    @Matches( '.*.jpg$')
  public avatar!: string;

    @IsString({message: 'Обязательное поле'})
    @MinLength(1,{message: 'Минимальная длина имени - 1 символ'})
    @MaxLength(15,{message: 'Максимальная длина имени - 15 символов'})
    public name!: string;

    @IsString({message: 'Обязательное поле'})
    @MinLength(6,{message: 'Минимальная длина пароля - 6 символов'})
    @MaxLength(12,{message: 'Максимальная длина пароля - 12 символов'})
    public password!: string;
}
