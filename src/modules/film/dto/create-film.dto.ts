import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Genre } from '../../../types/genres-type.js';

export default class CreateFilmDTO {
@MinLength(2,{message: 'Минимальная длина названия - 2 символа'})
@MaxLength(100,{message: 'Максимальная длина названия - 100 символов'})
  public title!: string;

@MinLength(20,{message: 'Минимальная длина описания - 20 символов'})
@MaxLength(1024,{message: 'Максимальная длина описания - 1024 символа'})
public description!: string;

@IsDateString({}, {message: 'Дата должна быть в ISO-формате'})
public date!: Date;

@IsEnum(Genre,{message: 'Вы можете выбрать один из представленных жанров:'})
public genre!: Genre;

@IsInt({message: 'Год должен быть представлен целым числом'})
public release!: string;

public rating!: string;
@MaxLength(256, {message: 'Слишком коротко для поля «image»'})
public preview!: string;

@MaxLength(256, {message: 'Слишком коротко для поля «image»'})
public video!: string;

@IsArray({message: 'Это поле должно быть массивом'})
@IsString({each: true, message: 'Напишите в строку имена актёров'})
public actors!: string;

@MinLength(2,{message: 'Минимальная длина имени - 2 символа'})
@MaxLength(50,{message: 'Максимальная длина имени - 50 символов'})
public producer!: string;

@IsInt({message: 'Длина фильма должна быть целым числом'})
public length!: string;

@IsString({message: 'Постер добавлен'})
@MaxLength(256, {message: 'Слишком коротко для поля «image»'})
@Matches( '.*.jpg$')
public poster!: string;

@IsString({message: 'Задний фон добавлен'})
@MaxLength(256, {message: 'Слишком коротко для поля «image»'})
@Matches( '.*.jpg$')
public background!: string;

@IsString({message: 'Основной цвет добавлен'})
@MaxLength(256, {message: 'Слишком коротко для поля bgColor'})
@Matches( '.*.jpg$')
public color!: string;

@IsMongoId({message: 'Поле userId должно иметь идентификатор'})
public userId!: string;
}

/*
public commentsCount!: number;
public user!: User;
*/
