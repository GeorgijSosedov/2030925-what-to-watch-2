import { DocumentType } from '@typegoose/typegoose/lib/types.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import CreateFilmDTO from './dto/create-film.dto.js';
import UpdateFilmDTO from './dto/update-film.dto.js';
import { FilmEntity } from './film.entity.js';

export interface FilmServiceInterface extends DocumentExistsInterface {
    create(dto: CreateFilmDTO): Promise<DocumentType<FilmEntity>>
    findById(filmId: string): Promise<DocumentType<FilmEntity> | null>
    find(count?: number): Promise<DocumentType<FilmEntity>[]>
    edit(filmId: string,body: UpdateFilmDTO): Promise<DocumentType<FilmEntity> | null>
    delete(filmId: string): Promise<DocumentType<FilmEntity> | null>
    findByGenre(genres: string, count?: number): Promise<DocumentType<FilmEntity>[]>
    findPromo(filmId: string): Promise<DocumentType<FilmEntity> | null>
    findFavorite(): Promise<DocumentType<FilmEntity>[]>
    addOrRemoveFavorite(filmId:string, status: 0|1): Promise<DocumentType<FilmEntity> | null>
    exists(filmId: string): Promise<boolean>;
    incCommentCount(filmId:string): Promise<DocumentType<FilmEntity> | null>
}
f