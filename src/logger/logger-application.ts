import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../config/config-interface.js';
import { Component } from '../types/component.types.js';
import { LoggerInterface } from './logger-interface.js';
import 'reflect-metadata';
import { DatabaseInterface } from '../database-client/database.interface.js';
import { getURI } from '../utils/db.js';
import express, { Express } from 'express';
import { ControllerInterface } from '../controller/controller.interface.js';
import { ExceptionFilterInterface } from '../utils/errors/exception-filter.interface.js';
import UserController from '../modules/user/controller/user.controller.js';
import CommentController from '../modules/comment/controller/comment.controller.js';
import { AuthenticateMiddleware } from '../utils/middlewares/authenticate.middleware.js';


@injectable()
export default class LoggerApplication {
  private expressApp: Express;
  static init() {
    throw new Error('Method not implemented.');
  }

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private database: DatabaseInterface,
    @inject(Component.FilmController) private filmController: ControllerInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController) private userController: UserController,
    @inject(Component.CommentController) private commentController: CommentController
  ) {
    this.expressApp = express();
  }

  public async initRoutes() {
    this.expressApp.use('/films', this.filmController.router);
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/comments', this.commentController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json);
    this.expressApp.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info('???????????????????? ??????????????????????????...');
    this.logger.info(`?????????????? ???????????????? .env... $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    await this.database.connect(uri);

    this.initMiddleware;
    this.initRoutes;
    this.initExceptionFilters;
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`???????????? ?????????????? ????: http://localhost:${this.config.get('PORT')}`);
  }
}
