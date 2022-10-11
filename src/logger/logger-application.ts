import { inject, injectable } from "inversify";
import { ConfigInterface } from "../config/config-interface.js";
import { Component } from "../types/component.types.js";
import { LoggerInterface } from "./logger-interface.js";
import 'reflect-metadata'

@injectable()
export default class LoggerApplication {
static init() {
    throw new Error('Method not implemented.');
}
constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface
) {}

public async init() {
    this.logger.info('Происходит инициализация...');
    this.logger.info(`Получаю значение .env... $PORT: ${this.config.get('PORT')}`)
};
};