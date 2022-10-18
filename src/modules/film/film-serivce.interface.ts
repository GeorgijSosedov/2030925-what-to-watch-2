import { DocumentType } from "@typegoose/typegoose/lib/types.js"
import CreateFilmDTO from "../dto/create-film.dto.js"
import { FilmEntity } from "./film.entity.js"

export interface FilmServiceInterface {
    create(dto: CreateFilmDTO, salt: string): Promise<DocumentType<FilmEntity>>
    findByGenre(genre: string): Promise<DocumentType<FilmEntity> | null>
}