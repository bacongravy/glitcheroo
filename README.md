<p align="center">
  <img src="https://raw.githubusercontent.com/bacongravy/glitcheroo/master/logo.png" width=300>
</p>

A CLI tool to deploy an app to an existing [Glitch](https://glitch.com) project. The contents of the existing Glitch project are completely replaced. Use carefully!

## Basic usage

A target Glitch project must be setup to receive deployments before you can deploy an app with `glitcheroo`.

Deployment is initiated from the source project. The source may be another Glitch project or a project committed to a Git repository on your local device.

[Node.js](https://nodejs.org) is required, version 8.2.0 or higher.

### Step 1: Setup the target

Open a terminal in the root of the Glitch project that you want to deploy to. Run the following command to setup the target project:

```sh
npx glitcheroo setup-target
```

**WARNING:** This command allows the Glitch project to be completely overwritten via remote Git operations.

### Step 2: Deploy the app

Open a terminal in the root of the project that you want to deploy. Run the following command to deploy the app:

```sh
npx glitcheroo deploy
```

The first time you run this command in a project it will prompt you to provide the Git URL of the **target project**. Find it in the "Tools > Import and Export" panel of the Glitch project editor.

And that's it! _There is no step 3._ Glitch will automatically detect the project change, reinstall the dependencies, and start the deployed app.

## Installation

Installation is not required. Node.js already includes the `npx` tool, and the `npx` tool automatically downloads and runs the latest version of `glitcheroo` every time you use it to run the commands.

If you don't want `npx` to re-download `glitcheroo` every time you run the commands you can install the `glitcheroo` package as a devDependency of the project you are deploying:

```sh
npm install -D glitcheroo
```

You should continue to use `npx` to run `glitcheroo` after installing the package. The `npx` tool will find the version of `glitcheroo` installed in your project and use it instead of downloading the latest version.

## Advanced usage

### Remix

As a convenience, this tool lets you remix a Glitch project to your local device. The remixed project is configured to target the original Glitch project for deployment.

Remix a target Glitch project by running the following command:

```sh
npx glitcheroo remix
```

Provide the Git URL of the _target project_ when prompted.

### Status

The configuration status for a project may be retrieved by running the following command:

```sh
npx glitcheroo status
```

This prints whether the project has been configured as a source, a target, or both.

### Reset

The configuration for a project may be reset by running the following command:

```sh
npx glitcheroo reset
```

This removes the Git configuration values added by the `setup-target`, `deploy`, and `remix` commands.

## Evironment variables

The `glitcheroo deploy` command will read the Git URL of the target project from the `GLITCHEROO_GIT_URL` environment variable if it is set.

## Implementation details

The `glitcheroo` tool works by configuring and using Git.

The `setup-target` command:

- sets the `receive.denyCurrentBranch` config value to `ignore` so that the `master` branch can be pushed to
- sets the `receive.shallowUpdate` config value to `true` so that shallow checkouts can be pushed
- installs a `post-receive` hook that runs after deploy and refreshes the workspace and Glitch editor with the new changes

The `deploy` command:

- adds a remote tracked repository named `glitcheroo` that points at the target
- pushes `+HEAD:master` to the `glitcheroo` remote

The `remix` command:

- clones the target Git repository
- renames the default remote in the new repository from `origin` to `glitcheroo`

## Acknowledgements

This project was inspired by [Melissa McEwen's](http://www.melissamcewen.com/) fascinating article [Automating My Deploys From GitHub to Glitch](https://dev.to/glitch/automating-my-deploys-from-github-to-glitch-2fpd), published on [DEV](https://dev.to/) on April 21, 2020.

Huge thanks to Glitch for providing a great service. This project is not affiliated with Glitch in any way.
