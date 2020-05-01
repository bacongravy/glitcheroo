# `glitcheroo`

A CLI tool to deploy an app to an existing Glitch project, completely replacing the project's previous contents. Use wisely!

## Basic usage

To use `glitcheroo` source and target projects must be configured. The target must be a Glitch project. The source may be another Glitch project or a project on a local device. The source project must be committed to a Git repository.

### Setup the target

Open a terminal in the root of the Glitch project that you want to deploy to. Run the following command to setup the target project:

```sh
npx glitcheroo setup-target
```

**WARNING:** This command allows the Glitch project to be completely overwritten via remote Git operations.

### Deploy the app

Open a terminal in the root of the project that you want to deploy. Run the following command to deploy the app:

```sh
npx glitcheroo deploy
```

The first time you run this command in a source project it will prompt you to provide the Git URL of the **target project**. Find it in the "Tools > Import and Export" panel of the Glitch project editor.

And that's it! Glitch will automatically detect the project change, reinstall the dependencies, and start the app.

## Advanced usage

### Remix

As a convenience, this tool lets you remix a Glitch project to your local device. The remixed project is configured to target the original Glitch project for deployment.

Remix a target Glitch project by running the following command:

```sh
npx glitcheroo remix
```

Provide the Git URL of the _target project_ when prompted.

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

This removes the Git configuration added by the `deploy`, `setup-target`, and `remix` commands.
