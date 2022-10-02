import FileReaderTSV from "../file-reader/file-reader-tsv.js";
import { CliCommandInterface } from "./cli-command.interface.js";
import chalk from "chalk";
import { createFilm } from "../utils/common.js";
import { getErrorMessage } from "../utils/get-error-message.js";

export default class ImportCommand implements CliCommandInterface {
    public readonly name = '--import'
    private onLine(line: string) {
        const film = createFilm(line)
        console.log(film)
    }
    private onComplete(count: number) {
        console.log(`${count} rows imported.`);
    }
    public execute(filename: string): void {
        const fileReader = new FileReaderTSV(filename.trim())
        try {
            fileReader.read()
            } catch (err) {
                console.log(chalk.red(`Не удалось завершить импорт данных. Возможная причина: ${getErrorMessage(err)}`));
        }
    }
}


/*
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
