import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../../../config/config-interface.js';
import { Controller } from '../../../controller/controller.js';
import { LoggerInterface } from '../../../logger/logger-interface.js';
import { Component } from '../../../types/component.types.js';
import { HttpMethod } from '../../../types/http-method.enum.js';
import { createJWT } from '../../../utils/createJWT.js';
import HttpError from '../../../utils/errors/http-error.js';
import { fillDTO } from '../../../utils/fillDTO.js';
import { UploadFileMiddleware } from '../../../utils/middlewares/upload-file.middleware.js';
import { ValidateDtoMiddleware } from '../../../utils/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../../utils/middlewares/validate-objectid.middleware.js';
import CreateUserDTO from '../dto/create-user.dto.js';
import LoginUserDTO from '../dto/login-user.dto.js';
import LoggedUserResponse from '../response/logged-user.response.js';
import UserResponse from '../response/user.response.js';
import { UserServiceInterface } from '../user-service.interface.js';
import { JWT_ALGORITM } from '../user.constant.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface
  ) {
    super(logger);
    this.logger.info('Регистрирую пути для UserController...');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new ValidateDtoMiddleware(CreateUserDTO),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate
    });
  }

  public async create(
    {body}: Request<Record<string,unknown>, Record<string,unknown>,CreateUserDTO>,
    res: Response,
  ): Promise<void> {
    const existUser = await this.userService.findByMail(body.mail);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        ` Упс! Кажется, твоё имя «${body.mail}» уже заняли.`,
        'UserController'
      );
    }
    const result = await this.userService.create(body,this.configService.get('SALT'));
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(UserResponse,result)
    );
  }

  public async login(
    {body}:  Request<Record<string,unknown>, Record<string,unknown>,LoginUserDTO>,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (! user) {
      throw new HttpError(
        StatusCodes.NOT_IMPLEMENTED,
        'Не существует',
        'UserController'
      );
    }
    const token = await createJWT(
      JWT_ALGORITM,
      this.configService.get('JWT_SECRET'),
      {mail: user.mail, id: user.id});
    this.ok(res,fillDTO(LoggedUserResponse, {mail: user.mail,token}));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async checkAuthenticate(req: Request, res: Response) {
    const user = await this.userService.findByMail(req.user.mail);

    this.ok(res, fillDTO(LoggedUserResponse, user));
  }
}
