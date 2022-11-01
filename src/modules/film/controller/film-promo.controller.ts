import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { injectable, inject } from "inversify";
import { Controller } from "../../../controller/controller";
import { LoggerInterface } from "../../../logger/logger-interface";
import { Component } from "../../../types/component.types";
import { HttpMethod } from "../../../types/http-method.enum";
import HttpError from "../../../utils/errors/http-error";
import { fillDTO } from "../../../utils/fillDTO";
import { PrivateRouteMiddleware } from "../../../utils/middlewares/private-route.middleware";
import { FilmServiceInterface } from "../film-serivce.interface";
import FilmResponse from "../response/film.response";

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