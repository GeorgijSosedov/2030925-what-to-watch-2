import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { Controller } from "../../../controller/controller";
import { LoggerInterface } from "../../../logger/logger-interface";
import { Component } from "../../../types/component.types";
import { HttpMethod } from "../../../types/http-method.enum";
import HttpError from "../../../utils/errors/http-error";
import { fillDTO } from "../../../utils/fillDTO";
import { ValidateDtoMiddleware } from "../../../utils/middlewares/validate-dto.middleware";
import { ValidateObjectIdMiddleware } from "../../../utils/middlewares/validate-objectid.middleware";
import { FilmServiceInterface } from "../../film/film-serivce.interface";
import { CommentServiceInterface } from "../comment-service.interface";
import CreateCommentDTO from "../dto/create-comment.dto";
import CommentResponse from "../response/comment.response";

@injectable()
export default class CommentController extends Controller {
    constructor(
        @inject(Component.LoggerInterface) logger: LoggerInterface,
        @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
        @inject(Component.FilmServiceInterface) private readonly filmSerivce: FilmServiceInterface
    ) {
        super(logger)

        this.logger.info('Регистрирую пути для CommentController...')
        this.addRoute({
            path: '/:commentId',
            method: HttpMethod.Post, 
            handler: this.create,
            middlewares: [
                new ValidateObjectIdMiddleware('filmId'),
                new ValidateDtoMiddleware(CreateCommentDTO)
        ]
        });
    }

    public async create(
        {body}: Request<object, object, CreateCommentDTO>,
        res: Response
    ): Promise<void> {
        if(!await this.filmSerivce.exists(body.filmId)) {
        throw new HttpError(
            StatusCodes.NOT_IMPLEMENTED,
            'Not implemented',
            'CommentController'
        );
    }
        const comment = await this.commentService.create(body);
        await this.filmSerivce.incCommentCount(body.filmId);
        this.created(res,fillDTO(CommentResponse,comment))
    }
}