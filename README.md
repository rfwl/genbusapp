# GenBusApp VS Code Extensions

This repository contains the GenBusApp VS Code extension packages organized by framework and backend target.

## Packages

- `vscode-extension/vscode-reactnextjs-mongodb`: React/Next.js + MongoDB app generator
- `vscode-extension/vscode-angular-firestore`: Angular + Firestore app generator

Each package is a standalone VS Code extension with its own `package.json`, lockfile, TypeScript config, source, examples, and packaged `.vsix` artifact.

## Development

Run package commands from the extension directory you want to work on.

```bash
cd vscode-extension/vscode-reactnextjs-mongodb
pnpm install
pnpm run compile
```

```bash
cd vscode-extension/vscode-angular-firestore
pnpm install
pnpm run compile
```

To test an extension locally:

1. Open the package directory in VS Code.
2. Press `F5`.
3. In the Extension Development Host window, open a JSON file and run the GenBusApp command.

## License

MIT. See each package's `LICENSE` file for details.
