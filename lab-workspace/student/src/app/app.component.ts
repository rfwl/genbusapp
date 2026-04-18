/* Copyright (c) 2025 j2code.app - Licensed under the MIT License (see LICENSE file for details) */



  import { Component, ViewChild } from '@angular/core';

  import { EnrolledStudentEditorAgGridComponent } from './enrolled-student/editor-aggrid/enrolled-student-editor-aggrid.component'

  import { EnrolledStudentEditorPTableComponent } from './enrolled-student/editor-ptable/enrolled-student-editor-ptable.component'

  import { EnrolledStudentEditorFormComponent } from './enrolled-student/editor-form/enrolled-student-editor-form.component'


  
  @Component({
    selector: 'app-root',
    //templateUrl: './app.component.html',
    template: `<div class="m-3">
    <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body " >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">JSON to Code (j2code)
      <i type="button" class="fa fa-question-circle"
        title="From a JSON string representing a business record, this JSON to Code (j2code) tool can instantly generate source code files to build an Editor Hierarchy,
  which can manage the entire business record list. The Editor Hierarchy includes source code files for editor forms, grid views, NGRX store, services, etc.,
  and can perform operations such as reading from the database, creating, updating, deleting, and writing to the database."
      ></i>
      </a>
    </div>
    </nav>
    <tabset #staticTabs >
    <tab heading="EnrolledStudent AgGrid">
      <enrolled-student-editor-aggrid #enrolledStudentEditorAgGridPage ></enrolled-student-editor-aggrid>
    </tab>  
    <tab heading="EnrolledStudent PTable">
      <enrolled-student-editor-ptable #enrolledStudentEditorPTablePage ></enrolled-student-editor-ptable>
    </tab>    
    </tabset>
  </div>`,
    standalone: false,
    //styleUrl: './app.component.scss'
  })
  export class AppComponent {
    title = 'enrolled-student';
  
    @ViewChild('enrolledStudentEditorAgGridPage', { static: false }) enrolledStudentEditorAgGrid?: EnrolledStudentEditorAgGridComponent
    //@ViewChild('enrolledStudentEditorPTablePage', { static: false }) enrolledStudentEditorPTable?: EnrolledStudentEditorPTableComponent
  
    
  } // end of class
  
  