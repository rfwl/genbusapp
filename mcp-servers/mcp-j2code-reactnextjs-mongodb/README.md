# MCP J2Code React NextJS MongoDB

A Model Context Protocol (MCP) server that enables Claude and Cursor to generate production-ready React/Next.js MongoDB business applications from JSON schema definitions.

## Features

- **Generate React/NextJS MongoDB Apps**: Convert JSON business record schemas into full-stack React + Next.js + MongoDB applications
- **Download Generated Code**: Fetch generated source code as ZIP files
- **Extract to Workspace**: Automatically extract generated code into your project directory
- **Validated JSON Input**: Built-in JSON validation for schema definitions
- **API Integration**: Direct integration with J2Code generation API

## Installation

### As a Cursor plugin (marketplace or local folder)

The manifest lives in [`.cursor-plugin/plugin.json`](.cursor-plugin/plugin.json). Cursor starts the MCP server with:

- **Command:** `node`
- **Args:** `./dist/index.js` (relative to this package root)
- **Env:** `J2CODE_API_URL` (optional; defaults to the public J2Code endpoint)

After cloning or unpacking the plugin, run **`npm install`** in this directory. The `prepare` script runs **`npm run build`**, which compiles TypeScript to `dist/`. If you ever need to refresh the marketplace icon asset, run **`npm run generate:icon`**.

### Via Cursor Plugin Marketplace

1. Open Cursor Settings
2. Navigate to "Plugins"
3. Search for `mcp-j2code-reactnextjs-mongodb`
4. Click "Install"

### Via Claude Code Plugin Marketplace

1. Visit [Claude Plugin Marketplace](https://plugins.claude.ai)
2. Search for "GenBusApp React NextJS MongoDB"
3. Click "Install"

### Manual Setup

1. Clone the [GenBusApp](https://github.com/rfwl/genbusapp) repository (or copy this folder).
2. From `mcp-servers/mcp-j2code-reactnextjs-mongodb`, run `npm install` (this also runs `npm run build` via `prepare`).
3. Add the server to your MCP configuration in Claude Desktop or Cursor (see below).

## Configuration

**Cursor:** Prefer installing as a plugin so Cursor reads `.cursor-plugin/plugin.json`. For a hand-edited MCP entry, use paths relative to this package root.

Add to your `claude_desktop_config.json` (or Cursor MCP settings), adjusting the path:

```json
{
  "mcpServers": {
    "j2code-reactnextjs-mongodb": {
      "command": "node",
      "args": ["/absolute/path/to/genbusapp/mcp-servers/mcp-j2code-reactnextjs-mongodb/dist/index.js"],
      "env": {
        "J2CODE_API_URL": "https://www.j2code.app/api/j2code/reactnextjs-mongodb"
      }
    }
  }
}
```

## Usage

### Available Tools

#### 1. generate-reactnextjs-mongodb-app
Generate a production-ready React/Next.js MongoDB application from sample JSON business data.

**Parameters:**
- `sampleJsonData` (string, required): Valid JSON string (sample business record or schema-style fields the generator accepts)
- `projectName` (string, optional): Name for the generated project

**Example:**
```json
{
  "sampleJsonData": "{\"name\": \"string\", \"email\": \"string\", \"age\": \"number\"}",
  "projectName": "my-app"
}
```

#### 2. download-generated-code
Download the generated application as a ZIP file.

**Parameters:**
- `downloadUrl` (string, required): The URL provided by the generation API
- `outputPath` (string, optional): Local path to save the ZIP file

**Example:**
```json
{
  "downloadUrl": "https://example.com/generated/app.zip",
  "outputPath": "./generated-app.zip"
}
```

#### 3. extract-zip-code
Extract a generated ZIP file into your workspace.

**Parameters:**
- `zipPath` (string, required): Path to the ZIP file
- `targetDirectory` (string, required): Directory where code should be extracted
- `folderName` (string, optional): Create a named subfolder during extraction

**Example:**
```json
{
  "zipPath": "./generated-app.zip",
  "targetDirectory": "./projects",
  "folderName": "my-new-project"
}
```

## Example Workflow

```
1. Create a JSON schema defining your business record:
   {"id": "string", "name": "string", "department": "string", "salary": "number"}

2. Use "generate-reactnextjs-mongodb-app" tool with your schema
   → Returns download URL and generation status

3. Use "download-generated-code" to fetch the generated code
   → Saves ZIP file to your system

4. Use "extract-zip-code" to extract it into your project
   → Extracts files with proper directory structure
```

## API Reference

### J2Code API Endpoint

- **URL**: `https://www.j2code.app/api/j2code/reactnextjs-mongodb`
- **Method**: POST
- **Content-Type**: application/json
- **Body**: Valid JSON schema string

**Response Format:**
```
Successfully uploaded the source code .zip file to Vercel Blob at: https://example.com/app.zip
You can download the .zip file from the above link.
```

## Sample JSON Schemas

### Employee Record
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "department": "string",
  "salary": "number",
  "startDate": "date",
  "status": "string"
}
```

### Product Record
```json
{
  "productId": "string",
  "name": "string",
  "category": "string",
  "price": "number",
  "stock": "number",
  "description": "string",
  "imageUrl": "string",
  "rating": "number"
}
```

### Order Record
```json
{
  "orderId": "string",
  "customerId": "string",
  "orderDate": "date",
  "status": "string",
  "total": "number",
  "items": "array",
  "shippingAddress": "string",
  "trackingNumber": "string"
}
```

## Generated Stack

The generated applications include:

- **Frontend**: React 18+ with TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: Ready for integration
- **UI**: Modern, responsive components
- **API**: RESTful endpoints
- **Validation**: Input validation
- **Error Handling**: Comprehensive error handling

## Error Handling

The server includes comprehensive error handling for:
- Invalid JSON schemas
- Network connectivity issues
- API failures
- File system errors during extraction
- ZIP file corruption

## Security Features

- Input validation for all JSON schemas
- Safe file path handling to prevent directory traversal
- API response validation
- HTTPS-only communication with J2Code API

## Contributing

Contributions are welcome! Please submit issues and pull requests to the [GenBusApp repository](https://github.com/rfwl/genbusapp).

## License

MIT License - See LICENSE file for details

## Support

- **Repository**: https://github.com/rfwl/genbusapp
- **Issues**: https://github.com/rfwl/genbusapp/issues
- **Website**: https://www.j2code.app

## Changelog

### Version 1.0.0
- Initial MCP server release
- Support for React/Next.js MongoDB code generation
- Download and extraction tools
- Marketplace-ready configuration
