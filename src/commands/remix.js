const { Command } = require('@oclif/command');
const { prompt } = require('enquirer');
const execa = require('execa');

const { REMOTE_NAME } = require('../constants');

const input = {
  type: 'input',
  name: 'repo',
  message: 'What is the Git URL of the Glitch project you want to remix?',
};

class RemixCommand extends Command {
  async run() {
    const { repo } = await prompt(input);
    const stdio = 'inherit';
    execa('git', ['clone', '--origin', REMOTE_NAME, repo], { stdio });
  }
}

RemixCommand.description = `remix a Glitch project
Creates a new local Git repository by cloning a Glitch project. Configures the newly-cloned project to target the Glitch project.
`;

module.exports = RemixCommand;
