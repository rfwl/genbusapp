# Configuration Example for Cursor

Copy the relevant configuration to your Cursor settings:

## macOS/Linux
Create or edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "j2code-reactnextjs-mongodb": {
      "command": "npx",
      "args": ["mcp-j2code-reactnextjs-mongodb@latest"],
      "env": {
        "J2CODE_API_URL": "https://www.j2code.app/api/j2code/reactnextjs-mongodb"
      }
    }
  }
}
```

## Windows
Create or edit `%APPDATA%\.cursor\mcp.json`:

```json
{
  "mcpServers": {
    "j2code-reactnextjs-mongodb": {
      "command": "npx",
      "args": ["mcp-j2code-reactnextjs-mongodb@latest"],
      "env": {
        "J2CODE_API_URL": "https://www.j2code.app/api/j2code/reactnextjs-mongodb"
      }
    }
  }
}
```

## Environment Variables

- `J2CODE_API_URL`: (Optional) Override the default J2Code API endpoint
  - Default: `https://www.j2code.app/api/j2code/reactnextjs-mongodb`
  - Use this to point to a custom API server if needed

## Usage in Cursor

After configuration, use the MCP tools in Cursor:

1. Open the command palette (Cmd+K or Ctrl+K)
2. Type "MCP" to see available tools
3. Select `generate-reactnextjs-mongodb-app`, `download-generated-code`, or `extract-zip-code`

## Installation Methods

### Method 1: npm (Recommended)
```bash
npm install -g mcp-j2code-reactnextjs-mongodb
```

### Method 2: Local Installation
```bash
git clone https://github.com/rfwl/genbusapp.git
cd genbusapp/mcp-j2code-reactnextjs-mongodb
npm install
npm run build
```

Then update your mcp.json to use local path:
```json
{
  "command": "node",
  "args": ["/path/to/mcp-j2code-reactnextjs-mongodb/dist/index.js"]
}
```

## Troubleshooting

### Server not appearing in Cursor
1. Check that mcp.json syntax is valid (use a JSON validator)
2. Restart Cursor
3. Check Cursor's debug console for errors

### Package not found
```bash
npm install mcp-j2code-reactnextjs-mongodb -g
npm update -g mcp-j2code-reactnextjs-mongodb
```

### API errors
1. Verify internet connection
2. Check API URL is accessible
3. Validate JSON schema format

## Development

To develop locally:
```bash
cd mcp-j2code-reactnextjs-mongodb
npm install
npm run dev  # TypeScript watch mode
```

In another terminal:
```bash
npm start
```
