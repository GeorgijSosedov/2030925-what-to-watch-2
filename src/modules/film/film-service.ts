import { inject, injectable } from "inversify";
import { Component } from "../../types/component.types.js";
import { FilmServiceInterface } from "./film-serivce.interface.js";
import { LoggerInterface } from "../../logger/logger-interface.js";
import { FilmEntity } from "./film.entity.js";
import { DocumentType, types } from "@typegoose/typegoose";
import createFilmDto from "./dto/create-film.dto.js";

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
    return this.filmModel.findById(filmId).exec();
    }
}