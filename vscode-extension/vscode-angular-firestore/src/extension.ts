import * as vscode from "vscode";
import * as path from "path";
import { promises as fs } from "fs";

const CONFIG_SECTION = "genbusapp";
const CONTEXT_KEY_HAS_VALID_JSON = "genbusapp.hasValidJson";

const DEFAULT_API_URL = "https://www.j2code.app/api/j2code/angular-firestore";
const RESPONSE_PREFIX = "Successfully uploaded the source code .zip file to Vercel Blob at: ";
const RESPONSE_SUFFIX = "You can download the .zip file from the above link.";

type DownloadAction = "open" | "copy" | "downloadExtract" | "downloadExtractNamed";
type DownloadActionOrPrompt = DownloadAction | "prompt";
type ZipEntryLike = {
  entryName: string;
  getData(): Buffer;
  isDirectory: boolean;
};

type AdmZipInstance = {
  getEntries(): ZipEntryLike[];
};

type AdmZipConstructor = new (input: Buffer) => AdmZipInstance;

function loadAdmZip(): AdmZipConstructor {
  try {
    // Load lazily so a packaging mistake cannot block extension activation.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("../vendor/adm-zip/adm-zip") as AdmZipConstructor;
  } catch {
    throw new Error(
      "Zip extraction is unavailable because the bundled zip library could not be loaded from the extension package."
    );
  }
}

function getApiUrl(): string {
  const configuration = vscode.workspace.getConfiguration(CONFIG_SECTION);
  const apiUrl = configuration.get<string>("apiUrl_angular_firestore")?.trim();
  return apiUrl && apiUrl.length > 0 ? apiUrl : DEFAULT_API_URL;
}

function getDefaultDownloadAction(): DownloadActionOrPrompt {
  const configuration = vscode.workspace.getConfiguration(CONFIG_SECTION);
  const action = configuration.get<string>("defaultDownloadAction_angular_firestore", "prompt");
  if (["prompt", "open", "copy", "downloadExtract", "downloadExtractNamed"].includes(action)) {
    return action as DownloadActionOrPrompt;
  }
  return "prompt";
}

function getNamedFolderName(defaultFileName: string): string {
  const configuration = vscode.workspace.getConfiguration(CONFIG_SECTION);
  let folderName = configuration.get<string>("namedDownloadFolderName_angular_firestore", "${fileName}");
  if (folderName.includes("${fileName}")) {
    folderName = folderName.replaceAll("${fileName}", defaultFileName);
  }
  return folderName || defaultFileName;
}

export function activate(context: vscode.ExtensionContext) {
  const updateContextDebounced = (() => {
    let timer: NodeJS.Timeout | undefined;
    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        void setHasValidJsonContextFromActiveEditor();
      }, 150);
    };
  })();

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => updateContextDebounced()),
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (vscode.window.activeTextEditor?.document === e.document) updateContextDebounced();
    })
  );

  void setHasValidJsonContextFromActiveEditor();

  const uploadJsonCommand = async (forcePrompt = false) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      await vscode.window.showWarningMessage("No active editor to read JSON from.");
      return;
    }

    const jsonText = editor.document.getText().trim();
    const parsed = tryParseJson(jsonText);
    if (!parsed.ok) {
      await vscode.window.showErrorMessage("Active editor does not contain valid JSON.");
      return;
    }

    const controller = new AbortController();
    const progressResultText = await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        cancellable: true,
        title: "GenBusApp: Uploading JSON…"
      },
      async (_progress, token) => {
        token.onCancellationRequested(() => controller.abort());
        const data = await postJsonString(getApiUrl(), jsonText, controller.signal);
        return data;
      }
    );

    //console.log("Response text:", progressResultText);

    const url = extractUrlFromTextResponse(progressResultText);
    //console.log("[GenBusApp] extractUrlFromTextResponse.url =", url);

    if (!url) {
      await vscode.window.showErrorMessage("API response did not contain a downloadable zip URL.", {
        modal: true,
        detail: progressResultText.slice(0, 4000)
      });
      return;
    }

    const currentFileName = path.parse(editor.document.fileName).name;

    const chosenAction = forcePrompt ? "prompt" : getDefaultDownloadAction();
    const finalAction: DownloadAction | undefined =
      chosenAction === "prompt" ? await showDownloadActionPanel(url, getNamedFolderName(currentFileName)) : chosenAction;

    try {
      if (!finalAction) {
        await vscode.window.showInformationMessage("No action selected. Operation canceled.");
        return;
      }

      await performDownloadAction(finalAction, url, currentFileName);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await vscode.window.showErrorMessage("Failed to complete selected action.", {
        modal: true,
        detail: message
      });
    }
  };

  context.subscriptions.push(
    vscode.commands.registerCommand("genbusapp.uploadJson_angular_firestore", () => uploadJsonCommand(false)),
    vscode.commands.registerCommand("genbusapp.uploadJsonQuick_angular_firestore", () => uploadJsonCommand(true))
  );
}

export function deactivate() {}

// #endregion

// #region Get, Check JSON and Post to API

function tryParseJson(text: string): { ok: true; value: unknown } | { ok: false } {
  try {
    const value = JSON.parse(text);
    return { ok: true, value };
  } catch {
    return { ok: false };
  }
}

async function setHasValidJsonContextFromActiveEditor(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    await vscode.commands.executeCommand("setContext", CONTEXT_KEY_HAS_VALID_JSON, false);
    return;
  }

  const text = editor.document.getText().trim();
  const hasValid = text.length > 0 && tryParseJson(text).ok;
  await vscode.commands.executeCommand("setContext", CONTEXT_KEY_HAS_VALID_JSON, hasValid);
}

async function postJsonString(apiUrl: string, jsonText: string, signal: AbortSignal): Promise<string> {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonText,
    signal
  });

  if (!res.ok) {
    const bodyText = await res.text();
    throw new Error(`API request failed (${res.status}): ${bodyText}`.slice(0, 2000));
  }

  return res.text();
}

// #endregion

// #region Extract URL from API response

function extractUrlFromTextResponse(text: string): string | undefined {
  const start = text.indexOf(RESPONSE_PREFIX);
  //console.log("[GenBusApp] extractUrlFromTextResponse.start =", start);

  let urlText: string | undefined;

  if (start !== -1) {
    const afterPrefix = start + RESPONSE_PREFIX.length;
    const end = text.indexOf(RESPONSE_SUFFIX, afterPrefix);
    //console.log("[GenBusApp] extractUrlFromTextResponse.end =", end);
    if (end !== -1) {
      urlText = text.slice(afterPrefix, end).trim();
    }
  }

  if (!urlText) {
    const urlMatch = text.match(/https?:\/\/[\w\-.:@%\/?=&#+~]+/i);
    urlText = urlMatch?.[0];
    //console.log("[GenBusApp] extractUrlFromTextResponse.fallback =", urlText);
  }

  //console.log("[GenBusApp] extractUrlFromTextResponse.urlText =", urlText);

  if (!urlText) return undefined;

  const urlNoNewlines = urlText.replace(/\\n/g, "").trim(); // CAUTION: must be /\\n/g, not /\n/g, // Remove any newlines that might be present due to formatting issues

  try {
    // Validate it's at least parseable as a URI.
    // eslint-disable-next-line no-new
    new URL(urlNoNewlines);
    return urlNoNewlines;
  } catch {
    return undefined;
  }
}

// #endregion

// #region Download and UI

function safeJoin(root: string, entryName: string): string {
  // Normalize entry name:
  // - remove any leading slashes so `/foo` is treated as `foo`
  // - keep inner directories as-is
  const normalized = entryName.replace(/^[/\\]+/, "");

  const dest = path.resolve(root, normalized);
  const rootResolved = path.resolve(root) + path.sep;
  if (!dest.startsWith(rootResolved)) {
    throw new Error(`Unsafe zip path detected: ${entryName}`);
  }
  return dest;
}

async function showDownloadActionPanel(url: string, folderName: string): Promise<DownloadAction | undefined> {
  const panel = vscode.window.createWebviewPanel(
    "genbusappDownloadOptions",
    "GenBusApp Download Options",
    vscode.ViewColumn.Active,
    { enableScripts: true }
  );

  panel.webview.html = getWebviewHtml(url, folderName);

  return new Promise<DownloadAction | undefined>((resolve) => {
    let resolved = false;

    const finish = (value: DownloadAction | undefined) => {
      if (resolved) return;
      resolved = true;
      resolve(value);
    };

    panel.onDidDispose(() => finish(undefined));

    panel.webview.onDidReceiveMessage((message) => {
      if (message?.type === "action") {
        const action = message.action as DownloadAction;
        finish(action);
        panel.dispose();
      }
    });
  });
}

async function performDownloadAction(action: DownloadAction, url: string, fileName: string): Promise<void> {
  if (action === "open") {
    await vscode.env.openExternal(vscode.Uri.parse(url));
    await vscode.window.showInformationMessage("Download link opened in browser.");
    return;
  }

  if (action === "copy") {
    await vscode.env.clipboard.writeText(url);
    await vscode.window.showInformationMessage("Download link copied to clipboard.");
    return;
  }

  if (action === "downloadExtract") {
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        cancellable: false,
        title: "GenBusApp: Downloading and extracting zip into workspace folder..."
      },
      async () => {
        await downloadAndExtractZipIntoWorkspace(url);
      }
    );
    await vscode.window.showInformationMessage("Zip downloaded and extracted into the current workspace folder.");
    return;
  }

  if (action === "downloadExtractNamed") {
    const resolvedFolderName = getNamedFolderName(fileName);
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        cancellable: false,
        title: `GenBusApp: Downloading and extracting zip into the: ${resolvedFolderName} folder...`
      },
      async () => {
        await downloadAndExtractZipIntoNamedFolder(url, resolvedFolderName);
      }
    );
    await vscode.window.showInformationMessage(`Zip downloaded and extracted into the ${resolvedFolderName} folder.`);
    return;
  }
}

function getWebviewHtml(url: string, folderName: string): string {
  const escapedUrl = url
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  const escapedFolderName = folderName
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GenBusApp Download</title>
  <style>
    :root {
      color-scheme: light dark;
    }
    body {
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      margin: 0;
      min-height: 100vh;
      padding: 28px;
      box-sizing: border-box;
    }
    .shell {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .card {
      border: 1px solid color-mix(in srgb, var(--vscode-panel-border) 78%, transparent);
      border-radius: 12px;
      padding: 20px;
      background: linear-gradient(
        180deg,
        color-mix(in srgb, var(--vscode-sideBar-background) 90%, transparent) 0%,
        color-mix(in srgb, var(--vscode-editor-background) 94%, transparent) 100%
      );
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--vscode-panel-border);
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 12px;
      color: var(--vscode-descriptionForeground);
      margin-bottom: 12px;
    }
    h2 {
      margin: 0;
      font-size: 22px;
      letter-spacing: 0.1px;
    }
    p {
      margin: 8px 0 0;
      line-height: 1.45;
      color: var(--vscode-descriptionForeground);
    }
    .url {
      margin-top: 16px;
      padding: 12px;
      border-radius: 8px;
      background: var(--vscode-textCodeBlock-background);
      border: 1px solid var(--vscode-panel-border);
      word-break: break-all;
      font-family: var(--vscode-editor-font-family);
      font-size: 12px;
      line-height: 1.45;
    }
    .actions {
      margin-top: 20px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    button {
      appearance: none;
      border: 1px solid var(--vscode-button-border, transparent);
      color: var(--vscode-button-foreground);
      background: var(--vscode-button-background);
      padding: 9px 14px;
      border-radius: 7px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: transform 120ms ease, filter 120ms ease;
    }
    button:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }
    button:focus-visible {
      outline: 2px solid var(--vscode-focusBorder);
      outline-offset: 2px;
    }
    button.secondary {
      background: var(--vscode-button-secondaryBackground);
      color: var(--vscode-button-secondaryForeground);
    }
    .hint {
      margin-top: 14px;
      font-size: 12px;
      color: var(--vscode-descriptionForeground);
      border-top: 1px dashed var(--vscode-panel-border);
      padding-top: 12px;
    }
    .footer {
      margin-top: 2px;
      font-size: 11px;
      color: var(--vscode-descriptionForeground);
      text-align: right;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="shell">
    <div class="card">
      <div class="eyebrow">
        <span>GenBusApp</span>
        <span>•</span>
        <span>Download Ready</span>
      </div>
      <h2>Your zip file is ready</h2>
      <p>Choose how you want to proceed with the generated source package.</p>
      <div class="url">${escapedUrl}</div>
      <div class="actions">
        <button id="open">Open link in browser</button>
        <button id="copy" class="secondary">Copy link</button>
        <button id="downloadExtract" class="secondary">Download & extract to workspace</button>
        <button id="downloadExtractNamed" class="secondary">Download & extract to folder: "${escapedFolderName}"</button>
      </div>
      <div class="hint">
        Tip: <strong>Download & extract</strong> writes files into your current workspace folder.
      </div>
    </div>
    <div class="footer">Close this tab to cancel.</div>
  </div>
  <script>
    const vscode = acquireVsCodeApi();
    document.getElementById('open')?.addEventListener('click', () => {
      vscode.postMessage({ type: 'action', action: 'open' });
    });
    document.getElementById('copy')?.addEventListener('click', () => {
      vscode.postMessage({ type: 'action', action: 'copy' });
    });
    document.getElementById('downloadExtract')?.addEventListener('click', () => {
      vscode.postMessage({ type: 'action', action: 'downloadExtract' });
    });
    document.getElementById('downloadExtractNamed')?.addEventListener('click', () => {
      vscode.postMessage({ type: 'action', action: 'downloadExtractNamed' });
    });
  </script>
</body>
</html>`;
} 

// #endregion

// #region Download and UI

async function downloadAndExtractZipIntoWorkspace(zipUrl: string): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    throw new Error("No workspace folder is open. Please open a folder before downloading the zip.");
  }

  const rootFsPath = workspaceFolder.uri.fsPath;

  const res = await fetch(zipUrl);
  if (!res.ok) {
    throw new Error(`Failed to download zip: ${res.status} ${res.statusText}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const AdmZip = loadAdmZip();
  const zip = new AdmZip(buffer);
  const entries = zip.getEntries();

  for (const entry of entries) {
    if (entry.isDirectory) continue;

    const outPath = safeJoin(rootFsPath, entry.entryName);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, entry.getData());
  }
}

async function downloadAndExtractZipIntoNamedFolder(zipUrl: string, folderName?: string): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    throw new Error("No workspace folder is open. Please open a folder before downloading the zip.");
  }

  const fileName = folderName ?? (() => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      throw new Error("No active editor. Please ensure a JSON file is open.");
    }
    return path.parse(editor.document.fileName).name;
  })();

  const rootFsPath = workspaceFolder.uri.fsPath;
  const targetFolderPath = path.join(rootFsPath, fileName);

  // Create target folder
  await fs.mkdir(targetFolderPath, { recursive: true });

  const res = await fetch(zipUrl);
  if (!res.ok) {
    throw new Error(`Failed to download zip: ${res.status} ${res.statusText}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const AdmZip = loadAdmZip();
  const zip = new AdmZip(buffer);
  const entries = zip.getEntries();

  for (const entry of entries) {
    if (entry.isDirectory) continue;

    const outPath = safeJoin(targetFolderPath, entry.entryName);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, entry.getData());
  }
}

// #endregion

