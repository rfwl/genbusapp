# GenBusApp Angular Firestore App Generator

`GenBusApp - Angular Firestore App Generator` is the VS Code extension published as `genbusapp-vscode-angular-firestore` by `genbusapp`.

[![Version](https://img.shields.io/badge/version-1.0.1-0f766e.svg)](https://marketplace.visualstudio.com/)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.88.0+-2563eb.svg)](https://code.visualstudio.com/)
[![License](https://img.shields.io/badge/license-MIT-16a34a.svg)](LICENSE)

Take a sample JSON business record and instantly generates a complete, functional Angular web application for managing the business record list in a Google Firestore database. 

The generated .zip file includes all necessary source code files: client components, pages, routes, API end-points, and utilities, ready to use out of the box. The sample JSON business record can have nested objects and arrays at any depth. Editor forms and grid views will be generated for them. This allows you to seamlessly perform all CRUD operations (Create, Read, Update, Delete) on both root and child records.

<mark>No LLM or AI Tools Used - Traditional way to generate fully verified, production-ready source code files!</mark>

## Features
- A couple kilobytes of a JSON string instantly generates hundreds kilobytes of source codes.
- Not only for the root level object, UI Components, like grid view and editor form, will be generated for unlimitedly-deep child objects and arrays.
- After generated, all these components will work perfectly without modifications.
- Majority of coding activities of a business application is for maintaining business record lists in a database. GenBusApp has AUTOMATED such activities. 

## Why Developers Use It
- No need to talk to AI model and just open a JSON document, run the command.
- You can choose whether to open the download URL, copy it, or extract the generated project directly into your workspace.
- Immediately run the generated web application without leaving VS Code.
- Generated codes are fully workable without any modification.

## Tutorial

[Please watch the tutorial on youtube.com](https://youtu.be/laDdtsVddlg)

## Core Workflow

1. Open a `.json` file that contains valid JSON.
2. Run one of these commands from the Command Palette or editor context menu:
   - `GenBusApp: Generate Angular Firestore App From JSON`
   - `GenBusApp: Generate Angular Firestore App From JSON (Quick Action)`
3. Wait for the upload to complete.
4. Choose what to do with the generated package:
   - Open the URL in a browser
   - Copy the URL
   - Download and extract into the workspace
   - Download and extract to a folder with your JSON file's name

## Try to use the backend J2Code API 
Welcome to experience the power of instant code generations, and take your Angular development to the next level!

**[j2code_angular_app_for_record_list_on_firestore](https://www.j2code.app/angular/j2codeapi/)**

This J2Code API function takes a sample JSON business record and instantly generates a complete, functional Angular web application for managing the business record list in a Google Firestore database. The generated .zip file includes all necessary source code files: client components, pages, routes, API end-points, and utilities, ready to use out of the box.
This function handles nested objects and arrays at any depth, creating comprehensive editor forms and grid views. This allows you to seamlessly perform all CRUD operations (Create, Read, Update, Delete) on both root and child records. 
## Example Input

```json
{
  "Code": 10176,
  "Title": "Ms",
  "FirstName": "Jeremi",
  "LastName": "Claudecoder",
  "DOB": "2010-11-25",
  "Gender": "F",
  "Active": true,
  "Address": {
    "AddressLine1": "Legal House",
    "AddressLine2": "123 Floradel Street, Chippendalen",
    "Suburb": "Tenlipu",
    "State": "ABC",
    "Postcode": "1234",
    "Country": "ABCEF",
    "j2codeConfig": {
      "multiWordsName": "student, address, record"
    }
  },
  "Contact": {
    "Mobile": "012345678",
    "Phone": "12345678",
    "Email": "abcdef@abcdef.com",
    "Web": "abcdef.com"
  },
  "j2codeConfig": {
    "multiWordsName": "student, record"
  }
}
```

## Configuration

The extension contributes these VS Code settings:

- `genbusapp.apiUrl_angular_firestore"`: API endpoint used to upload JSON and generate the zip package
- `genbusapp.defaultDownloadAction_angular_firestore"`: default post-upload action: `prompt`, `open`, `copy`, `downloadExtract`, or `downloadExtractNamed`
- `genbusapp.namedDownloadFolderName_angular_firestore"`: folder naming pattern for `downloadExtractNamed`; `${fileName}` resolves to the active JSON file name

After generating the app, update the project's `.env.local` file with your own Firestore account details and database name before running it locally.

## Requirements

- VS Code 1.88.0 or newer
- A valid JSON document in the active editor
- Network access to the configured generation API

## Extension Metadata

- Extension ID: `genbusapp-vscode-angular-firestore`
- Display name: `GenBusApp Angular Firestore App Generator`
- Publisher: `genbusapp`
- Current version: `1.0.2`

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
