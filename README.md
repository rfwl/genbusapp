# GenBusApp VS Code Extensions

This repository contains the remaining GenBusApp VS Code extension package.

## Package

- `vscode-extension/vscode-angular-firestore`: Angular + Firestore app generator

The package is a standalone VS Code extension with its own `package.json`, TypeScript config, source, examples, and packaged `.vsix` artifact.

## Development

Run package commands from the extension directory.

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
