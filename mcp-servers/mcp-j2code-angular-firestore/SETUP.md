# Setup Guide - MCP J2Code Angular Firestore

## Quick Start (5 minutes)

### 1. Install the MCP Server

**Option A: From npm (Recommended)**
```bash
npm install -g mcp-j2code-angular-firestore
```

**Option B: From GitHub**
```bash
git clone https://github.com/rfwl/genbusapp.git
cd genbusapp/mcp-j2code-angular-firestore
npm install
npm run build
npm start
```

### 2. Configure Claude Desktop

1. Open your configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Add this server configuration:
```json
{
  "mcpServers": {
    "j2code-angular-firestore": {
      "command": "npx",
      "args": ["mcp-j2code-angular-firestore"],
      "env": {
        "J2CODE_API_URL": "https://www.j2code.app/api/j2code/angular-firestore"
      }
    }
  }
}
```

3. Restart Claude Desktop

4. Verify in Claude:
   - The MCP icon should appear in the settings
   - You should see "j2code-angular-firestore" listed

### 3. Configure Cursor

1. Create or edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "j2code-angular-firestore": {
      "command": "npx",
      "args": ["mcp-j2code-angular-firestore"],
      "env": {
        "J2CODE_API_URL": "https://www.j2code.app/api/j2code/angular-firestore"
      }
    }
  }
}
```

2. Restart Cursor

## Testing the Setup

### Test in Claude:

```
User: Can you generate an Angular Firestore app for managing books?
Here's the schema:
{
  "id": "string",
  "title": "string",
  "author": "string",
  "isbn": "string",
  "pages": "number"
}
```

### Expected Response:
Claude should use the MCP tool to generate code and provide you with a download URL.

## Troubleshooting

### "Module not found" error
```bash
npm install -g mcp-j2code-angular-firestore
```

### "Cannot find configuration file"
Make sure the config directory exists:
- **macOS/Linux**: `mkdir -p ~/.config/Claude`
- **Windows**: Create `%APPDATA%\.cursor`

### "API Error 500"
- Check internet connection
- Verify API URL is correct
- Ensure JSON schema is valid

### "Server not appearing in Claude"
1. Check JSON syntax in config file
2. Restart Claude completely (not just reload)
3. Check Claude's debug logs

### Node.js not found
Install Node.js 18+: https://nodejs.org/

## Advanced Setup

### Environment Variables

Create a `.env` file in the server directory:

```bash
# Copy the example
cp .env.example .env

# Edit for your configuration
nano .env
```

Available variables:
- `J2CODE_API_URL`: Custom API endpoint
- `DEBUG`: Set to true for verbose logging
- `API_TIMEOUT`: Request timeout in milliseconds

### Custom API Endpoint

If you have a custom J2Code API server:

```json
{
  "env": {
    "J2CODE_API_URL": "https://your-custom-api.example.com/api/j2code/angular-firestore"
  }
}
```

### Local Development

```bash
# Clone repository
git clone https://github.com/rfwl/genbusapp.git
cd genbusapp/mcp-j2code-angular-firestore

# Install dependencies
npm install

# Start in watch mode
npm run dev

# In another terminal, start the server
npm start
```

## File Structure

```
mcp-j2code-angular-firestore/
├── src/
│   └── index.ts              # Main server implementation
├── dist/                     # Compiled JavaScript (after npm run build)
├── package.json              # Project metadata
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Documentation
├── LICENSE                   # MIT License
└── .env.example              # Environment variables template
```

## Uninstalling

### If installed globally:
```bash
npm uninstall -g mcp-j2code-angular-firestore
```

### Remove from Claude/Cursor:
Edit your configuration file and remove the `j2code-angular-firestore` entry.

## Getting Help

- **Report Issues**: https://github.com/rfwl/genbusapp/issues
- **Discussions**: https://github.com/rfwl/genbusapp/discussions
- **Email Support**: support@j2code.app

## Next Steps

1. Read the [README.md](./README.md) for detailed documentation
2. Check out [example schemas](#sample-schemas) in README
3. Explore the available [tools](#available-tools)
4. Create your first app!

---

**Enjoy generating production-ready Angular Firestore applications!** 🚀
