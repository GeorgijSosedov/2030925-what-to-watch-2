import typegoose, { defaultClasses, getModelForClass } from "@typegoose/typegoose";
import { Genre } from "../../types/genres-type";

const {prop,modelOptions} = typegoose

export interface GenreEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'genres'
    }
})

export class GenreEntity extends defaultClasses.TimeStamps implements Genre {
    @prop({required: true, trim: true})
    public name !: string;
}

export const GenreModel = getModelForClass(GenreEntity)