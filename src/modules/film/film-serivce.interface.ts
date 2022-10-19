import { DocumentType } from "@typegoose/typegoose/lib/types.js"
import CreateFilmDTO from "../dto/create-film.dto.js"
import { FilmEntity } from "./film.entity.js"

export interface FilmServiceInterface {
    create(dto: CreateFilmDTO): Promise<DocumentType<FilmEntity>>
    findById(id: string): Promise<DocumentType<FilmEntity> | null>
}