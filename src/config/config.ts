import { config  } from 'dotenv';
import { LoggerInterface } from '../logger/logger-interface.js';
import { ConfigInterface } from './config-interface.js';
import { configSchema, ConfigSchema } from './config.schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../types/component.types.js';

@injectable()
export default class Config implements ConfigInterface{
  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface) {
    this.logger = logger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Невозможно получить данные из .env файла.');
    }
    configSchema.load({});
    configSchema.validate({allowed: 'strict',output: this.logger.info});
    this.config = configSchema.getProperties();
    this.logger.info('.env файл успешно выполнен!');
  }

  public get<T extends keyof ConfigSchema> (key:T) {
    return this.config[key];
  }
}
