#!/usr/bin/env node

import HelpCommand from "./cli-commands/help-command";
import VersionCommand from "./cli-commands/version-command";
import CLIApplication from "./cli-application/cli-application";
import ImportCommand from "./cli-commands/import-command";

const myManager = new CLIApplication();
myManager.registerCommands([
    new HelpCommand,new VersionCommand, new ImportCommand
])
myManager.processCommand(process.argv)
