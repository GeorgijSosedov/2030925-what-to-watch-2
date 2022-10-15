import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { LoggerInterface } from "../logger/logger-interface";
import { Component } from "../types/component.types";
import { DatabaseInterface } from "./database.interface";

@injectable()
export default class Database implements DatabaseInterface {
    constructor(
        @inject(Component.LoggerInterface) private logger: LoggerInterface
    ) {}

    public async connect(uri: string): Promise<void> {
        this.logger.info('Попытка подключения к MongoDB...')
        await mongoose.connect(uri)
        this.logger.info('Есть контакт!')
    }
        
    public async disconnect(): Promise<void> {
            await mongoose.disconnect()
            this.logger.info('Отключаюсь!')
        }
    
}