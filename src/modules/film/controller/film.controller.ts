import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { Controller } from "../../../controller/controller.js";
import { LoggerInterface } from "../../../logger/logger-interface.js";
import { Component } from "../../../types/component.types.js";
import { HttpMethod } from "../../../types/http-method.enum.js";
import { FilmServiceInterface } from "../film-serivce.interface.js";
import { StatusCodes } from "http-status-codes"
import { fillDTO } from "../../../utils/fillDTO.js";
import FilmResponse from "../response/film.response.js";
import CreateFilmDTO from "../dto/create-film.dto.js";
import HttpError from "../../../utils/errors/http-error.js";

@injectable()
export default class FilmController extends Controller {
    constructor(
        @inject(Component.LoggerInterface) logger: LoggerInterface,
        @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface
        ) {
        super(logger)

        this.logger.info('Регистрирую пути для FilmController...')

        this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index})
        this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create})
    }

    public async index(_req: Request, res: Response): Promise<void> {
        const films = await this.filmService.find();
        const filmResponse = fillDTO(FilmResponse,films)
        this.send(res, StatusCodes.OK, filmResponse)
    }

    public async create(
        {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDTO>,
        res: Response): Promise<void> {

        const existFilm = await this.filmService.findByGenre(body.title);

        if (existFilm) {
            throw new HttpError(
                StatusCodes.UNPROCESSABLE_ENTITY,
                `Упс! Кажется,фильм с таким названием «${body.title}» уже существует.`,
                'CategoryController'
            ) 
            
    }
        

        const result = await this.filmService.create(body)
        this.send(
            res,
            StatusCodes.CREATED,
            fillDTO(FilmResponse, result)
        )
    }
}