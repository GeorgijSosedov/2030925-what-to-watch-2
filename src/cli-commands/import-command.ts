import FileReaderTSV from "../file-reader/file-reader-tsv";
import { CliCommandInterface } from "./cli-command.interface";

export default class ImportCommand implements CliCommandInterface {
    public readonly name = '--import'

    public execute(filename: string): void {
    const fileReader = new FileReaderTSV(filename.trim())
    try {
        fileReader.read
        console.log(fileReader.toArray)
        } catch (err) {
            if (!(err instanceof Error)) {
                throw err
        }
        console.log('Не удалось завершить импорт данных. Возможная причина: {err.message}')
        }
    }
}