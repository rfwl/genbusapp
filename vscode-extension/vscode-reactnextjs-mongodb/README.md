# GenBusApp

[![Version](https://img.shields.io/badge/version-1.0.0-0f766e.svg)](https://marketplace.visualstudio.com/)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.88.0+-2563eb.svg)](https://code.visualstudio.com/)
[![License](https://img.shields.io/badge/license-MIT-16a34a.svg)](LICENSE)

Turn valid JSON into a generated React/Next.js + MongoDB business application without leaving VS Code.

GenBusApp is built for developers who want a faster path from schema or sample data to a runnable application scaffold. Open a JSON document, run the command, and choose whether to open the download URL, copy it, or extract the generated project directly into your workspace.

## Why Developers Use It

- Generate a full application flow from the JSON already open in your editor
- Stay inside VS Code instead of switching between browser tools and local folders
- Extract generated code straight into the current workspace for immediate inspection
- Keep control over API endpoints and download behavior through settings
- Avoid noisy activation because commands only appear when the active file contains valid JSON

## Core Workflow

1. Open a `.json` file that contains valid JSON.
2. Run one of these commands from the Command Palette or editor context menu:
   - `GenBusApp: Generate React NextJS App From JSON`
   - `GenBusApp: Generate React NextJS App From JSON (Quick Action)`
3. Wait for the upload to complete.
4. Choose what to do with the generated package:
   - Open the URL in a browser
   - Copy the URL
   - Download and extract into the workspace
   - Download and extract to a folder with your JSON file's name

## Example Input

```json
{
  "appName": "OpsConsole",
  "entities": [
    {
      "name": "Customer",
      "fields": [
        { "name": "name", "type": "string" },
        { "name": "email", "type": "string" },
        { "name": "tier", "type": "string" }
      ]
    },
    {
      "name": "Invoice",
      "fields": [
        { "name": "customerId", "type": "string" },
        { "name": "amount", "type": "number" },
        { "name": "status", "type": "string" }
      ]
    }
  ]
}
```

## Configuration

After generating the app, update the project's `.env.local` file with your own MongoDB connection string and database name before running it locally.

## Requirements

- VS Code 1.88.0 or newer
- A valid JSON document in the active editor
- Network access to the configured generation API

## Developer Setup

```bash
pnpm install
pnpm run compile
pnpm run watch
pnpm run lint
pnpm run package
```

To run the extension locally:

1. Open the project in VS Code.
2. Press `F5`.
3. In the Extension Development Host window, open a JSON file and run a GenBusApp command.

## License

MIT. See [LICENSE](LICENSE).
