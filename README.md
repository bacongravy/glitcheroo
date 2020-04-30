# `glitcheroo`

A CLI tool to deploy an app to an existing Glitch project, completely replacing the project's previous contents. Use wisely!

The app you are deploying must be committed to a local git repository.

## Basic usage

### Setup the target

Open a terminal in the root of the Glitch project that you want to replace. Run the following command to setup the target project:

```sh
npx glitcheroo setup-target
```

**WARNING:** This command allows the Glitch project to be completely overwritten via remote Git operations.

### Deploy the app

Open a terminal in the root of the project that you want to deploy. This could be a project on your local computer, or another Glitch project.

Deploy the app by running the following command:

```sh
npx glitcheroo deploy
```

_Note: The first time you run this command it will prompt you to provide the Git URL of the **target project**. Find it in the "Tools > Import and Export" panel of the Glitch project editor. The URL will be saved as the Git remote `glitcheroo`._

And that's it! Glitch will automatically detect the project change, reinstall the dependencies, and start the app.

## Advanced usage

### Remix

Remix a target Glitch project by running the following command:

```sh
npx glitcheroo remix
```

Provide the Git URL of the _target project_ when prompted.

This creates a new local Git repository by cloning a Glitch project and then configures the new project to target the Glitch project for deployment.

### Status

Print the configuration status by running the following command:

```sh
npx glitcheroo status
```

This prints whether the project has been configured as a source, a target, or both.

### Reset

Reset the configuration for a project by running the following command:

```sh
npx glitcheroo reset
```

This removes the Git configuration added by the setup-target and deploy commands.
