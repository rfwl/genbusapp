# MCP J2Code Angular Firestore

A Model Context Protocol (MCP) server that enables Claude and Cursor to generate production-ready Angular Firestore business applications from JSON schema definitions.

## Features

- **Generate Angular Firestore Apps**: Convert JSON business record schemas into full-stack Angular + Firestore applications
- **Download Generated Code**: Fetch generated source code as ZIP files
- **Extract to Workspace**: Automatically extract generated code into your project directory
- **Validated JSON Input**: Built-in JSON validation for schema definitions
- **API Integration**: Direct integration with J2Code generation API

## Installation

### Via Cursor Plugin Marketplace

1. Open Cursor Settings
2. Navigate to "Plugins"
3. Search for "mcp-j2code-angular-firestore"
4. Click "Install"

### Via Claude Code Plugin Marketplace

1. Visit [Claude Plugin Marketplace](https://plugins.claude.ai)
2. Search for "GenBusApp Angular Firestore"
3. Click "Install"

### Manual Setup

1. Clone this repository
2. Run `npm install`
3. Run `npm run build`
4. Add to your MCP configuration in Claude or Cursor

## Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "j2code-angular-firestore": {
      "command": "node",
      "args": ["/path/to/mcp-j2code-angular-firestore/dist/index.js"],
      "env": {
        "J2CODE_API_URL": "https://www.j2code.app/api/j2code/angular-firestore"
      }
    }
  }
}
```

## Usage

### Available Tools

#### 1. generate-angular-firestore-app
Generate a production-ready Angular Firestore application from a JSON schema.

**Parameters:**
- `jsonSchema` (string, required): Valid JSON string defining your business record structure
- `projectName` (string, optional): Name for the generated project

**Example:**
```json
{
  "jsonSchema": "{\"name\": \"string\", \"email\": \"string\", \"age\": \"number\"}",
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

2. Use "generate-angular-firestore-app" tool with your schema
   → Returns download URL and generation status

3. Use "download-generated-code" to fetch the generated code
   → Saves ZIP file to your system

4. Use "extract-zip-code" to extract it into your project
   → Extracts files with proper directory structure
```

## API Reference

### J2Code API Endpoint

- **URL**: `https://www.j2code.app/api/j2code/angular-firestore`
- **Method**: POST
- **Content-Type**: application/json
- **Body**: Valid JSON schema string

**Response Format:**
```
Successfully uploaded the source code .zip file to Vercel Blob at: https://example.com/app.zip
You can download the .zip file from the above link.
```

## Sample JSON Schemas

### User Record
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "role": "string",
  "createdAt": "timestamp"
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
  "imageUrl": "string"
}
```

### Project Record
```json
{
  "projectId": "string",
  "title": "string",
  "description": "string",
  "status": "string",
  "assignedTo": "string",
  "dueDate": "date",
  "budget": "number",
  "progress": "number"
}
```

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
- Support for Angular Firestore code generation
- Download and extraction tools
- Marketplace-ready configuration
