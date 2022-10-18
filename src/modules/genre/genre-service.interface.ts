import { GenreEntity } from "./genre.entity.js";
import CreateGenreDTO from "./create-genre.dto.js";
import { DocumentType } from "@typegoose/typegoose/lib/types";

export interface GenreServiceInterface {
    create(dto: CreateGenreDTO): Promise<DocumentType<GenreEntity>>;

}