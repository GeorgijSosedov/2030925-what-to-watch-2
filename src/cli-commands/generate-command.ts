import { MockData } from "../types/mock-data.type.js";
import { CliCommandInterface } from "./cli-command.interface.js";
import got from "got";
import FilmCardGenerator from "../offer-generator/film-card-generator.js";
import FileWriterTSV from "../file-writer/file-writer-tsv.js";


export default class GenerateCommand implements CliCommandInterface {
public readonly name = '--generate';
private initialData!: MockData;


public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const filmCount = Number.parseInt(count, 10);

    try {
        this.initialData = await got.get(url).json()
    } catch {
        return console.log(`Упс! Я не смог получить данные с ${url}.`)
    }

    const filmGeneratorString = new FilmCardGenerator(this.initialData)
    const tsvFileWriter = new FileWriterTSV(filepath)

    for (let i = 0; i < filmCount ; i++) {
    await tsvFileWriter.write(filmGeneratorString.generate());
    }

    console.log('Я создал файл ${filepath}!')
  }
}
