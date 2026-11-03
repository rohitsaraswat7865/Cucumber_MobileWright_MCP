# Cucumber + MobileWright

BDD tests for Android apps. You write scenarios in Gherkin (`.feature` files) and step definitions in JavaScript. [playwright-bdd](https://github.com/vitalets/playwright-bdd) and [mobilewright](https://www.npmjs.com/package/mobilewright) run them on a real device or emulator.

Claude Code can write the steps you leave as `// TODO`. It uses the [mobile-mcp](https://github.com/mobile-next/mobile-mcp) server to inspect the running app.

## Prerequisites

- Node.js (current LTS) and npm
- An Android device or emulator with USB debugging on, listed by `adb devices`
- The app under test, installed on that device. The sample smoke test searches Google in Chrome.
- [Claude Code](https://claude.com/claude-code), if you want TODO steps filled automatically

## Setup

```sh
npm install
```

Create a `.env` file in the project root. It's gitignored, so each person keeps their own.

```ini
DEVICE_ID=emulator-5554        # from `adb devices`
APP_ID=com.android.chrome      # package name of the app under test
STEP_DELAY_MS=0                # optional pause after every step, in ms (handy for demos)
```

If mobilewright can't find your device, run `npx mobilewright doctor` to check your setup.

## Running tests

| Command                           | What it does                                                                                        |
| --------------------------------- | --------------------------------------------------------------------------------------------------- |
| `npm test`                        | Generates specs from the `.feature` files and runs every scenario                                   |
| `npm run test:tag -- "<pattern>"` | Runs only scenarios whose name or tag matches, e.g. `npm run test:tag -- "App shows expected text"` |
| `npm run report`                  | Opens the HTML report in `playwright-report/`                                                       |

Each test is recorded on video. When a test fails, the report also includes the screen's view tree.

## Project layout

```
features/
  *.feature            scenarios (Gherkin)
  steps/
    fixtures.js            Given/When/Then wired to the mobilewright `screen` fixture
    common.steps.js        step definitions
mobilewright.config.js     platform, device, timeouts, reporter
.mcp.json                  mobile-mcp server for Claude Code
CLAUDE.md                  instructions Claude Code follows in this repo
.claude/settings.json      guardrails Claude Code enforces (see below)
```

These folders are generated and gitignored, so don't edit them: `.features-gen/`, `playwright-report/`, `test-results/`, `logs/`.

## Writing a new step

1. Add the scenario to a `.feature` file.
2. For each step with no definition yet, add a stub to a file in `features/steps/`. The step text must match the feature exactly; use `{string}` or `{int}` for parameters. An optional hint after `TODO` tells Claude what you mean.
3. Implement the stub yourself, or let Claude Code do it (next section).

## Filling TODO steps with Claude Code

1. Connect the device and open this folder in Claude Code. The first time, approve the `mobile-mcp` server; you can check it's connected with `/mcp`.
2. Ask: **"Fill the TODO steps."** Claude uses `DEVICE_ID` and `APP_ID` from your `.env`, and only asks you if one of those is missing or the device isn't connected.
3. Claude works out at runtime how to inspect the app and which locators to use; the exact commands and their order aren't prescribed.
4. Claude finishes with a list of what it filled and the command to run. Review the changes, then run that command yourself.

## Guardrails

| Rule                                                                                                                    | How it's applied                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude only edits steps marked `// TODO`; existing steps, feature files, fixtures and config stay untouched             | Instruction in `CLAUDE.md`                                                                                                                              |
| Claude doesn't read or edit `node_modules/`, `.features-gen/`, reports, `test-results/`, `logs/` or `package-lock.json` | Deny rules in `.claude/settings.json` block Claude's file tools; `CLAUDE.md` also forbids shell reads such as `cat`                                     |
| Claude may read `.env` to get `DEVICE_ID` and `APP_ID`, but can't edit it                                               | `Edit` deny rules in `.claude/settings.json`; `CLAUDE.md` also tells it not to copy `.env` values into code                                             |
| Claude doesn't run tests or `bddgen`; it hands you the command instead                                                  | Deny rules in `.claude/settings.json` for `npm test`, `npm run test:tag`, `npm run bddgen`, `mobilewright test` and `playwright test`, plus `CLAUDE.md` |

Deny rules beat allow rules in every settings file. To loosen a guardrail, edit `.claude/settings.json` itself.
