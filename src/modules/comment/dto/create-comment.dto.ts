import { IsDateString, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from "class-validator";

export default class CreateCommentDTO {
    @MinLength(5,{message: 'Минимальная длина комментария - 5 символов'})
    @MaxLength(1024,{message: 'Максимальная длина комментария - 1024 символа'})
    public text!: string;
    @IsInt({message: 'Рейтинг отображается только целым числом!'})
    @Min(1, {message: 'Ваша оценка не может быть меньше единицы!'})
    @Max(10, {message: 'Ваша оценка не может быть больше десяти!'})
    public userRating!: string;
    @IsMongoId({message: 'Идентификатор фильма должен соответствовать ObjectID'})
    filmId!: string;
    @IsMongoId({message: 'Идентификатор пользователя должен соответствовать ObjectID'})
    public userId!: string;
    @IsDateString({}, {message: 'Дата должна быть в ISO-формате'})
    public date!: string;
}
