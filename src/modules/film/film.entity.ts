import typegoose,{ defaultClasses, getModelForClass } from "@typegoose/typegoose";
import { Film } from "../../types/films.js";
import { Genre } from "../../types/genres-type.js";
import { User } from "../../types/users.js";

const {prop, modelOptions} = typegoose

export interface FilmEntity extends defaultClasses.Base{}

@modelOptions({
    schemaOptions: {
        collection: 'films'
    }
})

export class FilmEntity extends defaultClasses.TimeStamps implements Film {
@prop({trim: true,required: true})
public title!: string
@prop({trim: true})
public description!: string
@prop()
public date!: Date
@prop()
public genre!: Genre
@prop()
public release!: string
@prop()
public rating!: string
@prop()
public preview!: string
@prop()
public video!: string
@prop()
public actors!: string
@prop()
public producer!: string
@prop()
public length!: string
@prop({default: 0})
public comments!: string
@prop()
public user!: User
@prop()
public poster!: string
@prop({required: true})
public background!: string
@prop({required: true})
public color!: string
}

export const FilmModel = getModelForClass(FilmEntity)