import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../../controller/controller.js';
import { LoggerInterface } from '../../../logger/logger-interface.js';
import { Component } from '../../../types/component.types.js';
import { HttpMethod } from '../../../types/http-method.enum.js';
import HttpError from '../../../utils/errors/http-error.js';
import { fillDTO } from '../../../utils/fillDTO.js';
import { PrivateRouteMiddleware } from '../../../utils/middlewares/private-route.middleware.js';
import { ValidateDtoMiddleware } from '../../../utils/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../../utils/middlewares/validate-objectid.middleware.js';
import { FilmServiceInterface } from '../../film/film-serivce.interface.js';
import { CommentServiceInterface } from '../comment-service.interface.js';
import CreateCommentDTO from '../dto/create-comment.dto.js';
import CommentResponse from '../response/comment.response.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
        @inject(Component.LoggerInterface) logger: LoggerInterface,
        @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
        @inject(Component.FilmServiceInterface) private readonly filmSerivce: FilmServiceInterface
  ) {
    super(logger);

    this.logger.info('Регистрирую пути для CommentController...');
    this.addRoute({
      path: '/:commentId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new ValidateDtoMiddleware(CreateCommentDTO),
        new PrivateRouteMiddleware()
      ]
    });
  }

  public async create(
    req: Request<object, object, CreateCommentDTO>,
    res: Response
  ): Promise<void> {
    const {body} = req;
    if(!await this.filmSerivce.exists(body.filmId)) {
      throw new HttpError(
        StatusCodes.NOT_IMPLEMENTED,
        'Not implemented',
        'CommentController'
      );
    }
    /*const userId = req.user.id*/
    const comment = await this.commentService.create({...body});
    await this.filmSerivce.incCommentCount(body.filmId);
    this.created(res,fillDTO(CommentResponse,comment));
  }
}
