import typegoose,{ defaultClasses, getModelForClass, Ref} from "@typegoose/typegoose";
import { User } from "../../types/users";
import { Comment } from "../../types/comments";
import { FilmEntity } from "../film/film.entity";
import { UserEntity } from "../user/user.entity";



const {prop,modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}
    
@modelOptions({
    schemaOptions: {
        collection: 'comments'
    }
})



export class CommentEntity extends defaultClasses.TimeStamps implements Comment{
    @prop({trim: true,required: true})
    public text!: string;
    @prop({required: true})
    public userRating!: string
    @prop()
    public user!: User;
    @prop({
        ref: FilmEntity,
        required: true
    })
    public filmId!: Ref<FilmEntity>;
    @prop({
        ref: UserEntity,
        required: true
    })
    public userId!: Ref<UserEntity>;
    }
    
    export const CommentModel = getModelForClass(CommentEntity)
