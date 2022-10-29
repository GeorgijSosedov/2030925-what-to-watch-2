import 'reflect-metadata'
import { Container } from "inversify"
import LoggerApplication from "./logger/logger-application.js"
import { LoggerInterface } from "./logger/logger-interface.js"
import { ConfigInterface } from "./config/config-interface.js"
import Logger from "./logger/logger.js"
import Config from "./config/config.js"
import { Component } from "./types/component.types.js"
import { DatabaseInterface } from './database-client/database.interface.js'
import Database from './database-client/database.js'
import { UserServiceInterface } from './modules/user/user-service.interface.js'
import UserService from './modules/user/user-service.js'
import { FilmServiceInterface } from './modules/film/film-serivce.interface.js'
import FilmService from './modules/film/film-service.js'
import { types } from '@typegoose/typegoose'
import { UserEntity, UserModel } from './modules/user/user.entity.js'
import { FilmEntity, FilmModel } from './modules/film/film.entity.js'
import { CommentServiceInterface } from './modules/comment/comment-service.interface.js'
import CommentService from './modules/comment/comment-service.js'
import { CommentEntity, CommentModel } from './modules/comment/comment.entity.js'
import { ControllerInterface } from './controller/controller.interface.js'
import FilmController from './modules/film/controller/film.controller.js'
import ExceptionFilter from './utils/errors/exception-filter.js'
import { ExceptionFilterInterface } from './utils/errors/exception-filter.interface.js'

const applicationContainer = new Container();
applicationContainer.bind<LoggerApplication>(Component.LoggerApplication).to(LoggerApplication).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(Logger).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(Config).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(Database).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService).inSingletonScope()
applicationContainer.bind<FilmServiceInterface>(Component.FilmServiceInterface).to(FilmService).inSingletonScope()
applicationContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService).inSingletonScope()
applicationContainer.bind<ControllerInterface>(Component.FilmController).to(FilmController).inSingletonScope()
applicationContainer.bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope()
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel)
applicationContainer.bind<types.ModelType<FilmEntity>>(Component.FilmModel).toConstantValue(FilmModel)
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel)

const application = applicationContainer.get<LoggerApplication>(Component.LoggerApplication);
await application.init()

