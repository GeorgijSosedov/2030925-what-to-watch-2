import { inject, injectable } from "inversify";
import { ConfigInterface } from "../config/config-interface.js";
import { Component } from "../types/component.types.js";
import { LoggerInterface } from "./logger-interface.js";
import 'reflect-metadata'
import { DatabaseInterface } from "../database-client/database.interface.js";
import { getURI } from "../utils/db.js";
import { UserModel } from "../modules/user/user.entity.js";


@injectable()
export default class LoggerApplication {
static init() {
    throw new Error('Method not implemented.');
}
constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private database: DatabaseInterface
) {}

public async init() {
    this.logger.info('Происходит инициализация...');
    this.logger.info(`Получаю значение .env... $PORT: ${this.config.get('PORT')}`)

    const uri = getURI(
        this.config.get('DB_USER'),
        this.config.get('DB_PASSWORD'),
        this.config.get('DB_HOST'),
        this.config.get('DB_PORT'),
        this.config.get('DB_NAME'),
      );
    await this.database.connect(uri)

    const user = new UserModel({
        email: 'test@emailru',
        avatarPath: 'keks.jpg',
        firstname: '2',
        lastname: 'Unknown'
      });
      
       const error = user.validateSync();
       console.log(error);
};
};