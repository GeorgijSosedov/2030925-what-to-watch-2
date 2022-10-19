import FileReaderTSV from "../file-reader/file-reader-tsv.js";
import { CliCommandInterface } from "./cli-command.interface.js";
import { createFilm } from "../utils/common.js";
import { getErrorMessage } from "../utils/get-error-message.js";
import { UserServiceInterface } from "../modules/user/user-service.interface.js";
import { FilmServiceInterface } from "../modules/film/film-serivce.interface.js";
import { DatabaseInterface } from "../database-client/database.interface.js";
import { LoggerInterface } from "../logger/logger-interface.js";
import UserService from "../modules/user/user-service.js";
import { UserModel } from "../modules/user/user.entity.js";
import FilmService from "../modules/film/film-service.js";
import { FilmModel } from "../modules/film/film.entity.js";
import ConsoleLoggerService from "../logger/console-logger.service.js";
import { Film } from "../types/films.js";
import { getURI } from "../utils/db.js";
import Database from "../database-client/database.js";

const DEFAULT_DB_PORT = 27017
const DEFAULT_USER_PASSWORD = '123456'

export default class ImportCommand implements CliCommandInterface {
    public readonly name = '--import';
    private userService!: UserServiceInterface
    private filmService!: FilmServiceInterface
    private databaseService!: DatabaseInterface
    private logger!: LoggerInterface
    private salt!: string

    constructor() {
        this.onLine = this.onLine.bind(this)
        this.onComplete = this.onComplete.bind(this)

        this.userService = new UserService(this.logger,UserModel)
        this.filmService = new FilmService(this.logger,FilmModel)
        this.databaseService = new Database(this.logger)
        this.logger = new ConsoleLoggerService()
    }

    private async saveFilm(film: Film) {
        const user = await this.userService.findOrCreate({
          ...film.user,
          password: DEFAULT_USER_PASSWORD
        }, this.salt);
    
    
    await this.filmService.create({
        ...film,
        userId: user.id,
        });
    }

    private async onLine(line: string, resolve: () => void) {
        const film = createFilm(line);
        await this.saveFilm(film);
        resolve()
    };

    private onComplete(count: number) {
        console.log(`${count} rows imported.`);
        this.databaseService.disconnect();
    };

    public async execute(filename: string, login: string, password: string, host: string, dbname: string,salt: string): Promise<void> {
        const uri = getURI(login,password,host, DEFAULT_DB_PORT, dbname);
        this.salt = salt

        await this.databaseService.connect(uri);

        const fileReader = new FileReaderTSV(filename.trim());

        fileReader.on('line', this.onLine);
        fileReader.on('end', this.onComplete);

        try {
            await fileReader.read()
        } catch(err) {
            console.log(`Не могу прочитать файл: ${getErrorMessage(err)}`);
        }
        }
    };
    
    
    
    
    
    
    
    
    
    /*
    private async saveFilm(film: Film) {
        const genres = []
        const user = await this.userService.findOrCreate({
            ...film.user,
            password: DEFAULT_USER_PASSWORD
        },this.salt)

        await this.filmService.create({
            ...film,
            
        })


    private onComplete(count: number) {
        console.log(`${count} rows imported.`);
    }
    public execute(filename: string): void {
        const fileReader = new FileReaderTSV(filename.trim())

        fileReader.on('line',this.onLine)
        fileReader.on('line', this.onComplete)
        try {
            fileReader.read()
            } catch (err) {
                console.log(chalk.red(`Не удалось завершить импорт данных. Возможная причина: ${getErrorMessage(err)}`));
        }
    }
}



    public execute(filename: string): void {
    const fileReader = new FileReaderTSV(filename.trim())
    try {
        fileReader.read()
        console.log(chalk.green(fileReader.toArray))
        } catch (err) {
            if (!(err instanceof Error)) {
                throw err
        }
        console.log(chalk.red('Не удалось завершить импорт данных. Возможная причина: {err.message}'))
*/
