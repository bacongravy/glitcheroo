const { Command } = require('@oclif/command');
const execa = require('execa');
const fs = require('fs');
const StatusCommand = require('./status');

const { HOOK_PATH, HOOK_CONTENT } = require('../constants');

class SetupTargetCommand extends Command {
  async run() {
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
