const c = require('ansi-colors');
const { Command } = require('@oclif/command');
const execa = require('execa');
const fs = require('fs');
const { prompt } = require('enquirer');
const StatusCommand = require('./status');

const { HOOK_PATH, HOOK_CONTENT } = require('../constants');

const confirm = {
  type: 'confirm',
  name: 'setup',
  message: 'Are you sure you want to set it up as a target?',
};

class SetupTargetCommand extends Command {
  async run() {
    if (!process.env.PROJECT_INVITE_TOKEN) {
      console.log(
        c.bold.yellow('!'),
        c.bold("This doesn't appear to be a Glitch project."),
      );
      const { setup } = await prompt(confirm);
      if (!setup) return;
    }
    await execa('git', ['config', 'receive.denyCurrentBranch', 'ignore']);
    fs.writeFileSync(HOOK_PATH, HOOK_CONTENT);
    await execa('chmod', ['+x', HOOK_PATH]);
    StatusCommand.run();
  }
}

SetupTargetCommand.aliases = ['yoyodyne'];

SetupTargetCommand.description = `setup a Glitch project to be a target
Configures a Glitch project to be a target.

WARNING: This configuration allows the Glitch project to be completely overwritten.`;

module.exports = SetupTargetCommand;
