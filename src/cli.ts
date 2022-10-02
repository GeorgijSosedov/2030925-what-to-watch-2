#!/usr/bin/env node

import HelpCommand from "./cli-commands/help-command.js";
import VersionCommand from "./cli-commands/version-command.js";
import CLIApplication from "./cli-application/cli-application.js";
import ImportCommand from "./cli-commands/import-command.js";
import GenerateCommand from "./cli-commands/generate-command.js";

const myManager = new CLIApplication();
myManager.registerCommands([
    new HelpCommand,new VersionCommand,
    new ImportCommand, new GenerateCommand
])
myManager.processCommand(process.argv)
