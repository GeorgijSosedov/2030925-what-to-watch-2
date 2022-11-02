import { Expose } from 'class-transformer';
import { User } from '../../../types/users.js';

export default class CommentResponse {
    @Expose()
  public text!: string;

    @Expose()
    public userRating!: string;

    @Expose()
    public postDate!: Date;

    @Expose()
    public user!: User;
}
