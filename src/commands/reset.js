const { Command } = require('@oclif/command');
const execa = require('execa');
const StatusCommand = require('./status');

const { HOOK_PATH, REMOTE_NAME } = require('../constants');

class ResetCommand extends Command {
  async run() {
    const opt = { reject: false };
    await execa('rm', [HOOK_PATH], opt);
    await execa('git', ['config', '--unset', 'receive.denyCurrentBranch'], opt);
    await execa('git', ['remote', 'remove', REMOTE_NAME], opt);
    StatusCommand.run();
  }
}

ResetCommand.description = `reset the configuration
Removes the Git configuration added by the setup-target and deploy commands.
`;

module.exports = ResetCommand;
