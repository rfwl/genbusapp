# GenBusApp MCP Servers - Marketplace Ready

Complete MCP (Model Context Protocol) server implementations for code generation, ready for submission to both Cursor Plugin Marketplace and Claude Code Plugin Marketplace.

## 📦 MCP Servers Included

### 1. **MCP J2Code Angular Firestore**
Generate production-ready Angular + Firebase/Firestore business applications from JSON schemas.

- **Location**: `/mcp-j2code-angular-firestore/`
- **NPM Package**: `mcp-j2code-angular-firestore`
- **Features**:
  - Generate complete Angular + Firestore apps
  - Download generated code
  - Extract to workspace
  - JSON schema validation

**Quick Start**:
```bash
cd mcp-j2code-angular-firestore
npm install
npm run build
```

### 2. **MCP J2Code React NextJS MongoDB**
Generate production-ready React + Next.js + MongoDB business applications from JSON schemas.

- **Location**: `/mcp-j2code-reactnextjs-mongodb/`
- **NPM Package**: `mcp-j2code-reactnextjs-mongodb`
- **Features**:
  - Generate complete React/Next.js + MongoDB apps
  - Download generated code
  - Extract to workspace
  - JSON schema validation

**Quick Start**:
```bash
cd mcp-j2code-reactnextjs-mongodb
npm install
npm run build
```

## 🚀 Key Features

Both MCP servers include:

✅ **Three Core Tools**:
1. App generation from JSON schemas
2. Code download functionality
3. ZIP extraction to workspace

✅ **Marketplace Ready**:
- Comprehensive documentation
- Setup guides for Claude Desktop and Cursor
- Example configurations
- Contributing guidelines
- Clear licensing (MIT)

✅ **Production Quality**:
- TypeScript with strict mode
- Error handling
- Input validation
- Security best practices
- Clean architecture

✅ **Complete Documentation**:
- README.md - Full feature documentation
- SETUP.md - Installation and configuration
- MARKETPLACE.md - Submission guidelines
- CONTRIBUTING.md - Development guidelines
- Configuration examples for both platforms

## 📋 File Structure

Each MCP server has:

```
mcp-j2code-{stack}/
├── src/
│   └── index.ts                    # Main server implementation
├── dist/                           # Compiled output
├── package.json                    # Dependencies & metadata
├── tsconfig.json                   # TypeScript config
├── README.md                       # Feature documentation
├── SETUP.md                        # Installation guide
├── MARKETPLACE.md                  # Submission guidelines
├── CONTRIBUTING.md                 # Contribution guidelines
├── LICENSE                         # MIT License
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
├── .npmignore                      # NPM ignore rules
├── claude_desktop_config.json      # Claude config example
└── cursor_mcp_config.md            # Cursor config example
```

## 🛠️ Installation & Deployment

### For Development:

```bash
# Angular Firestore
cd mcp-j2code-angular-firestore
npm install
npm run dev

# React NextJS MongoDB
cd mcp-j2code-reactnextjs-mongodb
npm install
npm run dev
```

### For Publishing to npm:

```bash
# Build
npm run build

# Login to npm
npm login

# Publish
npm publish
```

### For Marketplace Submission:

Follow the detailed guidelines in each server's `MARKETPLACE.md` file:
- Cursor Plugin Marketplace: Full submission checklist
- Claude Code Plugin Marketplace: Complete requirements
- Testing procedures
- Configuration examples

## 🔧 Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "j2code-angular-firestore": {
      "command": "npx",
      "args": ["mcp-j2code-angular-firestore"],
      "env": {
        "J2CODE_API_URL": "https://www.j2code.app/api/j2code/angular-firestore"
      }
    },
    "j2code-reactnextjs-mongodb": {
      "command": "npx",
      "args": ["mcp-j2code-reactnextjs-mongodb"],
      "env": {
        "J2CODE_API_URL": "https://www.j2code.app/api/j2code/reactnextjs-mongodb"
      }
    }
  }
}
```

### Cursor

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "j2code-angular-firestore": {
      "command": "npx",
      "args": ["mcp-j2code-angular-firestore"]
    },
    "j2code-reactnextjs-mongodb": {
      "command": "npx",
      "args": ["mcp-j2code-reactnextjs-mongodb"]
    }
  }
}
```

## 📚 Available Tools

### Angular Firestore Server
1. `generate-angular-firestore-app` - Generate app from JSON
2. `download-generated-code` - Download ZIP file
3. `extract-zip-code` - Extract files to workspace

### React NextJS MongoDB Server
1. `generate-reactnextjs-mongodb-app` - Generate app from JSON
2. `download-generated-code` - Download ZIP file
3. `extract-zip-code` - Extract files to workspace

## 📖 Documentation

Each MCP server includes comprehensive documentation:

| Document | Purpose |
|----------|---------|
| **README.md** | Feature overview, API reference, examples |
| **SETUP.md** | Installation, configuration, troubleshooting |
| **MARKETPLACE.md** | Publishing guidelines for both marketplaces |
| **CONTRIBUTING.md** | Development guidelines for contributors |

## ✅ Marketplace Readiness Checklist

Both servers are ready for submission:

- [x] TypeScript with full type safety
- [x] Compiled and tested
- [x] Comprehensive README
- [x] MIT License
- [x] package.json with all dependencies
- [x] Environment configuration examples
- [x] Error handling and validation
- [x] Security best practices
- [x] Setup documentation
- [x] Marketplace submission guides
- [x] Contributing guidelines

## 🔐 Security Features

- Input validation on all parameters
- URL validation before API calls
- Safe file path handling
- HTTPS-only API communication
- No sensitive data in logs
- Error messages without internals exposure

## 🧪 Testing

### Local Testing

```bash
# Build the server
npm run build

# Start the server
npm start

# In Claude/Cursor, ask it to generate an app
```

### Test Schemas

Angular Firestore:
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string"
}
```

React NextJS MongoDB:
```json
{
  "productId": "string",
  "name": "string",
  "price": "number",
  "stock": "number"
}
```

## 📝 Environment Variables

Both servers support:

```bash
J2CODE_API_URL=https://www.j2code.app/api/j2code/{stack}
DEBUG=false
API_TIMEOUT=30000
```

## 🤝 Contributing

Both projects welcome contributions! See `CONTRIBUTING.md` in each directory for:
- Development setup
- Code style guidelines
- Commit message format
- Pull request process
- Issue reporting guidelines

## 📄 License

Both projects are licensed under the **MIT License**. See LICENSE file in each directory.

## 🔗 Resources

- **GitHub**: https://github.com/rfwl/genbusapp
- **Website**: https://www.j2code.app
- **API Docs**: https://www.j2code.app/api/docs
- **Issues**: https://github.com/rfwl/genbusapp/issues

## 📦 Publishing Timeline

To publish both servers:

1. **Prepare**:
   - Run `npm run build` in each directory
   - Verify `npm publish --dry-run`

2. **npm Registry** (simultaneous):
   ```bash
   cd mcp-j2code-angular-firestore && npm publish
   cd mcp-j2code-reactnextjs-mongodb && npm publish
   ```

3. **Cursor Marketplace**:
   - Visit https://cursor.sh/extensions
   - Submit each server separately
   - ~24-48 hours for review

4. **Claude Plugin Marketplace**:
   - Visit https://plugins.claude.ai
   - Submit each server separately
   - ~48-72 hours for review

## 📞 Support

For questions or issues:
- GitHub Issues: https://github.com/rfwl/genbusapp/issues
- GitHub Discussions: https://github.com/rfwl/genbusapp/discussions
- Email: support@j2code.app

---

**Ready to generate beautiful, production-ready applications from JSON schemas!** 🎉
