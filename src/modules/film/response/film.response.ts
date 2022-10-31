import { Expose, Type } from 'class-transformer'
import UserResponse from '../../user/response/user.response';

export default class FilmResponse {
    @Expose()
    public id!: string;

    @Expose()
    public title!: string;

    @Expose()
    public description!: string;

    @Expose()
    public date!: Date;

    @Expose()
    public genre!: string[];

    @Expose()
    public release!: string;

    @Expose()
    public rating!: string;

    @Expose()
    public preview!: string;

    @Expose()
    public video!: string;

    @Expose()
    public actors!: string;

    @Expose()
    public producer!: string;

    @Expose()
    public length!: string;

    @Expose()
    public commentsCount!: number;

    @Expose({name: 'userId'})
    @Type(() => UserResponse)
    public user!: UserResponse;

    @Expose()
    public poster!: string;

    @Expose()
    public background!: string;

    @Expose()
    public color!: string;
}