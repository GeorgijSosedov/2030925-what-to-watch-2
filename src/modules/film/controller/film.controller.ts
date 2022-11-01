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
import UpdateFilmDTO from "../dto/update-film.dto.js";
import * as core from 'express-serve-static-core';
import { CommentServiceInterface } from "../../comment/comment-service.interface.js";
import CommentResponse from "../../comment/response/comment.response.js";
import { ValidateObjectIdMiddleware } from "../../../utils/middlewares/validate-objectid.middleware.js";
import { ValidateDtoMiddleware } from "../../../utils/middlewares/validate-dto.middleware.js";
import DocumentExistsMiddleware from "../../../utils/middlewares/document-exists.middleware.js";

type ParamsGetFilm = {
    filmId: string
}

@injectable()
export default class FilmController extends Controller {
    constructor(
        @inject(Component.LoggerInterface) logger: LoggerInterface,
        @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
        @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
        ) {
        super(logger)

        this.logger.info('Регистрирую пути для FilmController...')

        this.addRoute({
            path: '/:filmId',
            method: HttpMethod.Get,
            handler: this.show,
            middlewares: [
            new ValidateObjectIdMiddleware('filmId'),
            new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId')
        ]
         });
        this.addRoute({
            path: '/:filmId', 
            method: HttpMethod.Get, 
            handler: this.index,
            middlewares: [
                new ValidateObjectIdMiddleware('filmId'),
                new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId')
            ]
    })
        this.addRoute({
            path: '/', 
            method: HttpMethod.Post, 
            handler: this.create,
            middlewares: [
            new ValidateObjectIdMiddleware('filmId'),
            new ValidateDtoMiddleware(CreateFilmDTO),
            new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId')
            ]
    })
        this.addRoute({
            path: '/:filmId', 
            method: HttpMethod.Delete, 
            handler: this.delete,
            middlewares: [
            new ValidateObjectIdMiddleware('filmId'),
            new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId')]
        })
        this.addRoute({
            path: '/:filmId/comments', 
            method: HttpMethod.Get, 
            handler: this.getComments,
            middlewares: [
                new ValidateObjectIdMiddleware('filmId'),
                new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId')
        ]
        })
        this.addRoute({
            path: '/:filmId', 
            method: HttpMethod.Patch, 
            handler: this.edit,
            middlewares: [
            new ValidateObjectIdMiddleware('filmId'),
            new ValidateDtoMiddleware(CreateFilmDTO),
            new DocumentExistsMiddleware(this.filmService, 'Film', 'filmId')
            ]
    })
    }

    public async show(
        {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
        res: Response 
    ): Promise<void> {
        const {filmId} = params;
        const film = await this.filmService.findById(filmId)
            this.ok(res, fillDTO(FilmResponse, film));
        }
    

    public async index(_req: Request, res: Response): Promise<void> {
        const films = await this.filmService.find();
        const filmResponse = fillDTO(FilmResponse,films)
        this.send(res, StatusCodes.OK, filmResponse)
    }

    public async create(
        {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDTO>,
        res: Response): Promise<void> {
        const result = await this.filmService.create(body)
        this.send(
            res,
            StatusCodes.CREATED,
            fillDTO(FilmResponse, result)
        )
    }

    public async delete(
        {params}: Request<core.ParamsDictionary | ParamsGetFilm>,
        res: Response
    ): Promise<void> {
        const {filmId} = params
        const film = await this.filmService.delete(filmId)
        this.noContent(res, film)
    }

    public async edit(
        {body,params}: Request<core.ParamsDictionary | ParamsGetFilm, Record<string, unknown>,
        UpdateFilmDTO>,
        res: Response
    ): Promise<void> {
        const updatedFilm = await this.filmService.edit(params.filmId, body)
        this.ok(res, fillDTO(FilmResponse, updatedFilm))
    }

    public async getComments(
        {params}: Request<core.ParamsDictionary | ParamsGetFilm, object, object>,
        res: Response
    ): Promise<void> {
        const comments = await this.commentService.findById(params.filmId);
        this.ok(res, fillDTO(CommentResponse,comments))
    }
}