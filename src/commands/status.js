const { Command } = require('@oclif/command');
const fs = require('fs');
const execa = require('execa');

const { HOOK_PATH, REMOTE_NAME } = require('../constants');

const getMessage = (hasRemote, hasHook) => {
  let message = 'This project is';
  if (!hasRemote && !hasHook) {
    message += ' not configured';
  } else {
    message += ' configured as';
    if (hasRemote) message += ' a source';
    if (hasRemote && hasHook) message += ' and';
    if (hasHook) message += ' a target';
  }
  message += '.';
  return message;
};

class StatusCommand extends Command {
  async run() {
    const hasRemote = await execa('git', ['remote', 'show', REMOTE_NAME])
      .then(() => true)
      .catch(() => false);
    const hasHook = fs.existsSync(HOOK_PATH);
    console.log(getMessage(hasRemote, hasHook));
  }
}

StatusCommand.description = `print the configuration status
Prints whether the project has been configured as a source, a target, or both.`;

module.exports = StatusCommand;
