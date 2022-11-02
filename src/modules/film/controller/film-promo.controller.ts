import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';
import { Controller } from '../../../controller/controller.js';
import { LoggerInterface } from '../../../logger/logger-interface.js';
import { Component } from '../../../types/component.types.js';
import { HttpMethod } from '../../../types/http-method.enum.js';
import HttpError from '../../../utils/errors/http-error.js';
import { fillDTO } from '../../../utils/fillDTO.js';
import { PrivateRouteMiddleware } from '../../../utils/middlewares/private-route.middleware.js';
import { FilmServiceInterface } from '../film-serivce.interface.js';
import FilmResponse from '../response/film.response.js';

@injectable()
export default class FilmPromoController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private filmService: FilmServiceInterface,
  ) {
    super(logger);
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getPromo,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
  }

  public async getPromo(
    req: Request,
    res: Response
  ):Promise<void> {
    const promoFilm = await this.filmService.findPromo(req.user?.id);

    if (!promoFilm) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        'Promo film not exist',
        'FilmPromoController'
      );
    }
    this.ok(res, fillDTO(FilmResponse, promoFilm));
  }
}
