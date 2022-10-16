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

const applicationContainer = new Container();
applicationContainer.bind<LoggerApplication>(Component.LoggerApplication).to(LoggerApplication).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(Logger).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(Config).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(Database).inSingletonScope();

const application = applicationContainer.get<LoggerApplication>(Component.LoggerApplication);
await application.init()

