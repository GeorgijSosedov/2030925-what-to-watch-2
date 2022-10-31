import { Expose } from "class-transformer";
import { User } from "../../../types/users";

export default class CommentResponse {
    @Expose()
    public text!: string

    @Expose()
    public userRating!: string

    @Expose()
    public postDate!: Date

    @Expose()
    public user!: User
}