import typegoose,{ defaultClasses, getModelForClass } from "@typegoose/typegoose";
import { User } from "../../types/users";
import { Comment } from "../../types/comments";


const {prop,modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}
    
@modelOptions({
    schemaOptions: {
        collection: 'comments'
    }
})



export class CommentEntity extends defaultClasses.TimeStamps implements Comment{
@prop({trim: true,required: true})
public text!: string
@prop({required: true})
public userRating!: string
@prop({required: true})
public postDate!: string
@prop({required: true})
public user!: User
}

export const CommentModel = getModelForClass(CommentEntity)