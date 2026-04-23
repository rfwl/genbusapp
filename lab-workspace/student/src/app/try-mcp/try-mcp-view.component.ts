/* Copyright (c) 2025 j2code.app - Licensed under the MIT License (see LICENSE file for details) */



import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { GenerateReactNextJSMongoDBAppTool, DownloadGeneratedCodeTool, ExtractZipCodeTool } from 'mcp-j2code-reactnextjs-mongodb';

@Component({
  selector: 'try-mcp-view',
  //templateUrl: './app.component.html',
  template: `<div class="m-3">
  <h1>Try MCP</h1>
</div>`,
  standalone: false,
  //styleUrl: './app.component.scss'
})
export class TryMCPViewComponent {

  async generateReactNextJSMongoDBApp() {
    const tool = new GenerateReactNextJSMongoDBAppTool();
    return await tool.generateReactNextJSMongoDBApp('https://www.j2code.app/api/j2code/reactnextjs-mongodb');
      console.log(data);
    });
  }

  async downloadGeneratedCode() {
    const tool = new DownloadGeneratedCodeTool();
    return await tool.downloadGeneratedCode('https://www.j2code.app/api/j2code/reactnextjs-mongodb');
  }
  
  async extractZipCode() {
    const tool = new ExtractZipCodeTool();
    return await tool.extractZipCode('https://www.j2code.app/api/j2code/reactnextjs-mongodb');
  }
  
  
  private generateReactNextJSMongoDBAppTool: GenerateReactNextJSMongoDBAppTool;
  private downloadGeneratedCodeTool: DownloadGeneratedCodeTool;
  private extractZipCodeTool: ExtractZipCodeTool;
  
  constructor(private http: HttpClient) {
    this.generateReactNextJSMongoDBAppTool = new GenerateReactNextJSMongoDBAppTool();
    this.downloadGeneratedCodeTool = new DownloadGeneratedCodeTool();
    this.extractZipCodeTool = new ExtractZipCodeTool();
  }
} // end of class

