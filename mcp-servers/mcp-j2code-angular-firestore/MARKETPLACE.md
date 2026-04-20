# Marketplace Submission Guide

## Cursor Plugin Marketplace

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- Cursor application installed

### Submission Steps

1. **Build the server:**
   ```bash
   npm install
   npm run build
   ```

2. **Test the server locally:**
   ```bash
   npm start
   ```

3. **Publish to npm:**
   ```bash
   npm publish
   ```

4. **Submit to Cursor Marketplace:**
   - Visit [Cursor Extensions](https://cursor.sh/extensions)
   - Click "Submit Plugin"
   - Select "MCP Server" category
   - Fill in required information:
     - Name: `mcp-j2code-angular-firestore`
     - Description: Angular Firestore code generation via J2Code API
     - Repository: https://github.com/rfwl/genbusapp
     - npm Package: `mcp-j2code-angular-firestore`

### Configuration for Cursor Users

Add to `.cursor/mcp.json`:

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

## Claude Code Plugin Marketplace

### Prerequisites
- Claude account with API access
- MCP server published to npm

### Submission Steps

1. **Prepare submission materials:**
   - README.md (included)
   - LICENSE (MIT included)
   - package.json with proper metadata
   - dist/ folder with compiled code

2. **Visit Claude Plugin Center:**
   - Go to https://plugins.claude.ai
   - Click "Create New Plugin"
   - Select "MCP Server"

3. **Fill in Plugin Details:**
   - Plugin Name: `GenBusApp Angular Firestore`
   - Type: `MCP Server`
   - Description: Generates production-ready Angular Firestore applications from JSON schemas
   - Keywords: angular, firestore, code-generation, business-app, j2code
   - Category: Developer Tools / Code Generation

4. **Configure Access:**
   - npm Package Name: `mcp-j2code-angular-firestore`
   - Version: Latest
   - Permissions: Network access (for API calls)

### Configuration for Claude Users

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "j2code-angular-firestore": {
      "command": "npx",
      "args": ["mcp-j2code-angular-firestore@latest"],
      "env": {
        "J2CODE_API_URL": "https://www.j2code.app/api/j2code/angular-firestore"
      }
    }
  }
}
```

## Verification Checklist

Before submitting to either marketplace, ensure:

- [ ] All dependencies are listed in package.json
- [ ] Code compiles without errors: `npm run build`
- [ ] README is comprehensive and up-to-date
- [ ] LICENSE file is included
- [ ] .npmignore is configured properly
- [ ] dist/ folder is generated and includes all necessary files
- [ ] No sensitive data in code or configuration examples
- [ ] Tool descriptions are clear and accurate
- [ ] Error handling is comprehensive
- [ ] Security best practices are followed

## Publishing Process

### npm Registry
```bash
npm login
npm version patch  # or minor/major for significant changes
npm publish
```

### GitHub Releases
```bash
git tag v1.0.0
git push origin v1.0.0
# Create release notes on GitHub
```

## Support and Issues

- Report issues: https://github.com/rfwl/genbusapp/issues
- Request features: https://github.com/rfwl/genbusapp/discussions
- Contact: support@j2code.app

## Versioning

This project follows [Semantic Versioning](https://semver.org/):
- MAJOR: API changes or breaking updates
- MINOR: New features
- PATCH: Bug fixes

## Security Considerations

- All API calls use HTTPS
- User input is validated before processing
- File paths are sanitized
- No sensitive data is logged
- Error messages don't expose internal details

## Performance

- Lazy loading of dependencies
- Streaming file downloads
- Efficient JSON validation
- Minimal memory footprint

## Maintenance

The server is actively maintained. Updates will be published to both marketplaces simultaneously.
