import chalk from "chalk";
import { CliCommandInterface } from "./cli-command.interface.js";

export default class HelpCommand implements CliCommandInterface {
    public readonly name = '--help'

    public async execute(): Promise<void> {
        console.log(chalk.white(`
            Программа для подготовки данных для REST API сервера.

            Пример:
                main.js --<command> [--arguments]

            Команды:
                --version:                      # выводит версию приложения
                --help:                         # показывает этот текст
                --import <filepath>:            # импортирует данные из TSV
                --generate <n> <filepath> <url> # генерирует произвольное количество тестовых данных
            `));
      }
    }
    