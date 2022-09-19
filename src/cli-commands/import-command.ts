import FileReaderTSV from "../file-reader/file-reader-tsv.js";
import { CliCommandInterface } from "./cli-command.interface.js";
import chalk from "chalk";

export default class ImportCommand implements CliCommandInterface {
    public readonly name = '--import'

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
        }
    }
}

