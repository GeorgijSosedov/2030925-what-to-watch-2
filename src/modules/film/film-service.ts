import { inject, injectable } from "inversify";
import { Component } from "../../types/component.types.js";
import { FilmServiceInterface } from "./film-serivce.interface.js";
import { LoggerInterface } from "../../logger/logger-interface.js";
import { FilmEntity } from "./film.entity.js";
import { DocumentType, types } from "@typegoose/typegoose";
import createFilmDto from "./dto/create-film.dto.js";
import { Types } from "mongoose";
import { DEFAULT_FILMS_COUNT } from "./film.constant.js";
import { SortType } from "../../types/sort-type.enum.js";

@injectable()
export default class FilmService implements FilmServiceInterface {
constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
) {}

public async create(dto: createFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`Вы добавили новый фильм:${dto.title}!`);

    return result
}

public async findById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return (await this.filmModel
    /* .findById(filmId)
    .populate(['userId', 'films']) */
    .aggregate([
        {$match:{ _id: new Types.ObjectId(filmId)}},
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'filmId',
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: {
          path :'$user',
          preserveNullAndEmptyArrays: true}
        },
        {
          $addFields: {
            commentsCount: { $size: '$comments'}, userRating: { $avg: '$comments.UserRating'}
          }
        },
        { $unset: 'comments' },
        { $sort: { releaseDate: -1 } },
      ]).exec())[0];
  }
public async find(count?: number): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILMS_COUNT
    return this.filmModel
 /*   .find({}, {limit}) 
    .sort({createdAt: SortType.Down})
    .populate(['userId','films']) */
    .aggregate([
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'filmId',
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: {
          path :'$user',
          preserveNullAndEmptyArrays: true}
        },
        {
          $addFields: {
            commentsCount: { $size: '$comments'}, userRating: { $avg: '$comments.userRating'}
          }
        },
        { $unset: 'comments' },
        { $limit: limit },
        { $sort: { releaseDate: -1 } },
      ]).exec();
  }

public async edit(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
    .findByIdAndUpdate(filmId)
    .populate(['userId','films'])
    .exec()
}

public async delete(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
    .findByIdAndDelete(filmId)
    .exec()
}

public async findByGenre(genreId: string,count?: number): Promise<DocumentType<FilmEntity>[]> {
    const limit = count ?? DEFAULT_FILMS_COUNT
    return this.filmModel
    .find({genre: genreId}, {}, {limit})
    .sort({createdAt: SortType.Down})
    .populate(['userId','genres'])
    .exec()
}

public async findFavorite(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
    .aggregate([
        {$match: {isFavorite: true}},
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'filmId',
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: {
          path :'$user',
          preserveNullAndEmptyArrays: true}
        },
        {
          $addFields: {
            commentCount: { $size: '$comments'}, userRating: { $avg: '$comments.userRating'}
          }
        },
        { $unset: 'comments' },
        { $sort: { releaseDate: -1 } },
      ]).exec();
  }

public async addOrRemoveFavorite(filmId:string, status: 0|1): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
    .findByIdAndUpdate(filmId, {isFavorite: status}, {new: true})
    .exec()
}

public async findPromo(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
    .findById(filmId)
    .populate(['userId','films'])
    .exec()
}

public async exists(filmId: string): Promise<boolean> {
    return (await this.filmModel
        .exists({_id: filmId})) !== null;
}

public async incCommentCount(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
    .findByIdAndUpdate(filmId,{
        '$inc': {
    commentsCount: 1
    }}).exec()
}
}
