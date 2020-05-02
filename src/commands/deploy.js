const c = require('ansi-colors');
const { Command } = require('@oclif/command');
const { prompt } = require('enquirer');
const execa = require('execa');

const { REMOTE_NAME } = require('../constants');

const input = {
  type: 'input',
  name: 'repo',
  message: 'What is the Git URL of the Glitch project you want to deploy to?',
};

const confirm = {
  type: 'confirm',
  name: 'deploy',
  message: 'Are you sure you want to deploy?',
};

class DeployCommand extends Command {
  async run() {
    const hasRemote = await execa('git', ['remote', 'show', REMOTE_NAME])
      .then(() => true)
      .catch(() => false);
    if (!hasRemote) {
      const { repo } = await prompt(input);
      await execa('git', ['remote', 'add', 'glitcheroo', repo]);
    }
    const { stdout } = await execa('git', ['status', '--porcelain']);
    if (stdout.trim() !== '') {
      console.log(
        c.bold.yellow('!'),
        c.bold('Project git status is not clean:'),
      );
      console.log(stdout);
      const { deploy } = await prompt(confirm);
      if (!deploy) return;
    }
    const stdio = 'inherit';
    await execa('git', ['push', REMOTE_NAME, '+HEAD:master'], { stdio });
  }
}

DeployCommand.aliases = ['banzai'];

DeployCommand.description = `deploy a project to Glitch
Deploys the HEAD of the current branch to the master branch of a target project on Glitch. Prompts for the target project's Git URL the first time it is run.`;

module.exports = DeployCommand;
