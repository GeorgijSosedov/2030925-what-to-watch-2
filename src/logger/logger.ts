import pino from 'pino';
import { LoggerInterface } from './logger-interface.js';
import { injectable } from 'inversify';

@injectable()
export default class Logger implements LoggerInterface {
  private logger!: LoggerInterface;

  constructor() {
    this.logger = pino();
    this.logger.info('Логи создаются...');
  }

  public info(message: string, ...args: unknown[]): void{
    this.logger.info(message,args);
  }

  public warn(message:string,...args: unknown[]): void {
    this.logger.warn(message,args);
  }

  public error(message: string , ...args: unknown[]): void {
    this.logger.error(message,args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message,args);
  }
}
