import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { ConfigInterface } from "../../../config/config-interface.js";
import { Controller } from "../../../controller/controller.js";
import { LoggerInterface } from "../../../logger/logger-interface.js";
import { Component } from "../../../types/component.types.js";
import { HttpMethod } from "../../../types/http-method.enum.js";
import HttpError from "../../../utils/errors/http-error.js";
import { fillDTO } from "../../../utils/fillDTO.js";
import CreateUserDTO from "../dto/create-user.dto.js";
import LoginUserDTO from "../dto/login-user.dto.js";
import UserResponse from "../response/user.response.js";
import { UserServiceInterface } from "../user-service.interface.js";

@injectable()
export default class UserController extends Controller {
constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configInterface: ConfigInterface
) {
    super(logger)
    this.logger.info('Регистрирую пути для UserController...')

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create})
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login})
}

public async create(
    {body}: Request<Record<string,unknown>, Record<string,unknown>,CreateUserDTO>,
    res: Response,
    ): Promise<void> {
        const existUser = await this.userService.findByMail(body.mail)

        if (existUser) {
            throw new HttpError(
                StatusCodes.CONFLICT,
                ` Упс! Кажется, твоё имя «${body.mail}» уже заняли.`,
                'UserController'
            )
        }
        const result = await this.userService.create(body,this.configInterface.get('SALT'))
        this.send(
            res,
            StatusCodes.CREATED,
            fillDTO(UserResponse,result)
        )
    }

    public async login(
        {body}:  Request<Record<string,unknown>, Record<string,unknown>,LoginUserDTO>,
        _res: Response,
    ): Promise<void> {
        const existUser = await this.userService.findByMail(body.mail)

        if (existUser) {
            throw new HttpError(
                StatusCodes.NOT_IMPLEMENTED,
                'Не существует',
                'UserController',
            )
        }
    }
}