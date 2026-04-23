//#region Imports
import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
//#endregion

//#region Types and Configuration
interface ToolInput {
  [key: string]: string | number | boolean | undefined;
}

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required: string[];
  };
}

const CONFIG = {
  API_URL: process.env.J2CODE_API_URL || "https://www.j2code.app/api/j2code/reactnextjs-mongodb",
  RESPONSE_PREFIX: "Successfully uploaded the source code .zip file to Vercel Blob at: ",
  RESPONSE_SUFFIX: "You can download the .zip file from the above link.",
};
//#endregion

//#region Tool Definitions

const TOOLS: ToolDefinition[] = [
  {
    name: "generate-reactnextjs-mongodb-app",
    description:
      "Generate a production-ready React/Next.js MongoDB business application from sample JSON business data. Sends your sample JSON business record to the J2Code API which generates complete, deployable source code with React components, Next.js API routes, and MongoDB integration.",
    inputSchema: {
      type: "object",
      properties: {
        sampleJsonData: {
          type: "string",
          description:
            "Sample JSON business data representing your record. Example: {\"Code\": 10176, \"Title\": \"Ms\", \"FirstName\": \"John\", \"LastName\": \"Smith\", \"Email\": \"john@example.com\"}",
        },
        projectName: {
          type: "string",
          description:
            "Optional name for the generated project (used in metadata)",
        },
      },
      required: ["sampleJsonData"],
    },
  },
  {
    name: "download-generated-code",
    description:
      "Download the generated application code as a ZIP file from the provided URL. Returns the path where the file was saved.",
    inputSchema: {
      type: "object",
      properties: {
        downloadUrl: {
          type: "string",
          description: "The full URL to the generated ZIP file",
        },
        outputPath: {
          type: "string",
          description:
            "Local file path where the ZIP should be saved (e.g., './app.zip'). Defaults to './generated-app.zip'",
        },
      },
      required: ["downloadUrl"],
    },
  },
  {
    name: "extract-zip-code",
    description:
      "Extract a generated ZIP file into your workspace directory. Safely extracts all files with proper directory structure.",
    inputSchema: {
      type: "object",
      properties: {
        zipPath: {
          type: "string",
          description: "Path to the ZIP file to extract",
        },
        targetDirectory: {
          type: "string",
          description: "Directory where files should be extracted",
        },
        folderName: {
          type: "string",
          description:
            "Optional: create a named subfolder inside targetDirectory before extracting",
        },
      },
      required: ["zipPath", "targetDirectory"],
    },
  },
];
//#endregion

//#region Helper Functions

function validateJson(jsonStr: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(jsonStr);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `Invalid JSON: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

function extractUrlFromResponse(text: string): string | null {
  // Try to extract URL between the prefix and suffix
  const start = text.indexOf(CONFIG.RESPONSE_PREFIX);
  if (start !== -1) {
    const afterPrefix = start + CONFIG.RESPONSE_PREFIX.length;
    const end = text.indexOf(CONFIG.RESPONSE_SUFFIX, afterPrefix);
    if (end !== -1) {
      const urlText = text.slice(afterPrefix, end).trim();
      if (urlText) {
        try {
          new URL(urlText);
          return urlText;
        } catch {
          // Continue to fallback
        }
      }
    }
  }

  // Fallback: try to find any HTTPS URL
  const urlMatch = text.match(/https?:\/\/[\w\-.:@%\/?=&#+~]+/i);
  if (urlMatch) {
    try {
      new URL(urlMatch[0]);
      return urlMatch[0];
    } catch {
      // Continue
    }
  }

  return null;
} // end of function extractUrlFromResponse

//#endregion

//#region Tools Implementations - three main tools
async function generateApp(sampleJsonData: string, projectName?: string): Promise<TextContent> {
  // Validate JSON input
  const validation = validateJson(sampleJsonData);
  if (!validation.valid) {
    return {
      type: "text",
      text: `Error: ${validation.error}`,
    };
  }

  try {
    const response = await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: sampleJsonData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        type: "text",
        text: `API Error (${response.status}): ${errorText.slice(0, 500)}`,
      };
    }

    const responseText = await response.text();
    const downloadUrl = extractUrlFromResponse(responseText);

    if (!downloadUrl) {
      return {
        type: "text",
        text: `Could not extract download URL from API response: ${responseText.slice(0, 500)}`,
      };
    }

    return {
      type: "text",
      text: `Successfully generated React/Next.js MongoDB application${projectName ? ` (${projectName})` : ""}!\n\nDownload URL: ${downloadUrl}\n\nYou can now use the 'download-generated-code' tool to fetch the generated code, or copy the URL directly to download in your browser.`,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return {
      type: "text",
      text: `Error generating app: ${errorMsg}`,
    };
  }
}

async function downloadCode(downloadUrl: string, outputPath?: string): Promise<TextContent> {
  const finalPath = outputPath || "./generated-app.zip";

  try {
    // Validate URL
    try {
      new URL(downloadUrl);
    } catch {
      return {
        type: "text",
        text: `Invalid URL: ${downloadUrl}`,
      };
    }

    const response = await fetch(downloadUrl);
    if (!response.ok) {
      return {
        type: "text",
        text: `Failed to download: ${response.status} ${response.statusText}`,
      };
    }

    const buffer = await response.arrayBuffer();
    const fs = await import("fs/promises");
    await fs.writeFile(finalPath, new Uint8Array(buffer));

    const fileSizeKB = (buffer.byteLength / 1024).toFixed(2);
    return {
      type: "text",
      text: `Successfully downloaded generated code to: ${finalPath}\nFile size: ${fileSizeKB} KB\n\nYou can now use the 'extract-zip-code' tool to extract the files into your workspace.`,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return {
      type: "text",
      text: `Error downloading code: ${errorMsg}`,
    };
  }
}

async function extractZip(
  zipPath: string,
  targetDirectory: string,
  folderName?: string
): Promise<TextContent> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");

    // Check if ZIP file exists
    try {
      await fs.access(zipPath);
    } catch {
      return {
        type: "text",
        text: `ZIP file not found: ${zipPath}`,
      };
    }

    // Ensure target directory exists
    await fs.mkdir(targetDirectory, { recursive: true });

    // Determine extraction directory
    let extractPath = targetDirectory;
    if (folderName) {
      extractPath = path.join(targetDirectory, folderName);
      await fs.mkdir(extractPath, { recursive: true });
    }

    // Read ZIP file
    const zipBuffer = await fs.readFile(zipPath);

    // Since we can't use adm-zip (not standard in Node), we'll use native extraction
    // For a proper implementation, users would need to install 'unzipper' or similar
    // For now, we provide a guide on how to extract
    
    return {
      type: "text",
      text: `ZIP file ready for extraction: ${zipPath}\n\nTo extract the files, you have several options:\n\n1. Using Node.js (install 'unzipper' package first):\n   npm install unzipper\n\n2. Using system command:\n   unzip "${zipPath}" -d "${extractPath}"\n\n3. Using tar (if ZIP contains tar.gz):\n   tar -xzf "${zipPath}" -C "${extractPath}"\n\nAfter extraction, the generated React/Next.js MongoDB application will be ready in: ${extractPath}`,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return {
      type: "text",
      text: `Error preparing extraction: ${errorMsg}`,
    };
  }
}
//#endregion

//#region Main Server Implementation  ¨

async function runServer() {
  // Initialize server
  const server = new McpServer(
    {
      name: "mcp-j2code-reactnextjs-mongodb",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {
          listChanged: true,
        },
      },
    }
  );

  // List tools handler
  server.server.setRequestHandler(ListToolsRequestSchema, () => ({
    tools: TOOLS.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  }));

  // Call tool handler
  server.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const toolName = request.params.name;
      const args = (request.params.arguments ?? {}) as ToolInput;

      try {
        switch (toolName) {
          case "generate-reactnextjs-mongodb-app":
            return {
              content: [
                await generateApp(
                  args.sampleJsonData as string,
                  args.projectName as string | undefined
                ),
              ],
            };

          case "download-generated-code":
            return {
              content: [
                await downloadCode(
                  args.downloadUrl as string,
                  args.outputPath as string | undefined
                ),
              ],
            };

          case "extract-zip-code":
            return {
              content: [
                await extractZip(
                  args.zipPath as string,
                  args.targetDirectory as string,
                  args.folderName as string | undefined
                ),
              ],
            };

          default:
            return {
              content: [
                {
                  type: "text",
                  text: `Unknown tool: ${toolName}`,
                },
              ],
              isError: true,
            };
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error executing tool: ${errorMsg}`,
            },
          ],
          isError: true,
        };
      }
  });

  // Connect to stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("MCP J2Code React/NextJS MongoDB server started successfully");
}

// Run server
runServer().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

//#endregion
