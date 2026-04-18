/* Copyright (c) 2025 j2code.app - Licensed under the MIT License (see LICENSE file for details) */


  import { NgModule } from "@angular/core";
  import { CommonModule } from "@angular/common";
  import { FormsModule } from '@angular/forms'
  import { ReactiveFormsModule } from '@angular/forms'
  import { RouterModule, Routes } from "@angular/router";
  import { HttpClientModule } from "@angular/common/http";

  import { StoreModule } from "@ngrx/store";
  import { EffectsModule } from "@ngrx/effects";

  import { ModalModule } from 'ngx-bootstrap/modal';
  import { BsModalService } from 'ngx-bootstrap/modal';
  import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

  import { AgGridModule } from 'ag-grid-angular'
  import { TableModule } from 'primeng/table'

  import { EnrolledStudentEditorAgGridComponent } from "./editor-aggrid/enrolled-student-editor-aggrid.component";
  import { EnrolledStudentEditorPTableComponent } from "./editor-ptable/enrolled-student-editor-ptable.component";
  import { EnrolledStudentEditorFormComponent } from "./editor-form/enrolled-student-editor-form.component";

  import { EnrolledStudentService } from "./enrolled-student.service";
  import { EnrolledStudentEffects, enrolledStudentReducer, } from "./enrolled-student.store";
  import { OpenFieldEditorCellRendererComponent, OpenFieldEditorFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputGroupFormControlComponent, BEPInputFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPCheckboxComponent, BEPCheckboxGroupComponent, DataTypeArrayCellRendererComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";
  import { BEPInputBooleanFormControlComponent, BEPInputBooleanGroupFormControlComponent } from "../editor-hierarchy-shared/editor-hierarchy-shared.component";

  import { EditorHierarchySharedModule } from "../editor-hierarchy-shared/editor-hierarchy-shared.module";


import { StudentAddressRecordChildEditorAgGridComponent } from "./student-address-record/editor-aggrid/student-address-record-child-editor-aggrid.component";
import { StudentAddressRecordChildEditorPTableComponent } from "./student-address-record/editor-ptable/student-address-record-child-editor-ptable.component";
import { StudentAddressRecordChildEditorFormComponent } from "./student-address-record/editor-form/student-address-record-child-editor-form.component";
import { ContactChildEditorAgGridComponent } from "./contact/editor-aggrid/contact-child-editor-aggrid.component";
import { ContactChildEditorPTableComponent } from "./contact/editor-ptable/contact-child-editor-ptable.component";
import { ContactChildEditorFormComponent } from "./contact/editor-form/contact-child-editor-form.component";



  const routes: Routes = [
    { path: "", redirectTo: "list", pathMatch: 'full' },
    { path: "aggrid", component: EnrolledStudentEditorAgGridComponent, },
    { path: "ptable", component: EnrolledStudentEditorPTableComponent, },
    { path: "**", redirectTo: "" }
  ];

  @NgModule({
    declarations: [
      EnrolledStudentEditorAgGridComponent,
      EnrolledStudentEditorPTableComponent,
      EnrolledStudentEditorFormComponent,


StudentAddressRecordChildEditorAgGridComponent,
StudentAddressRecordChildEditorPTableComponent,
StudentAddressRecordChildEditorFormComponent,
ContactChildEditorAgGridComponent,
ContactChildEditorPTableComponent,
ContactChildEditorFormComponent,



    ],

    exports: [
      EnrolledStudentEditorAgGridComponent,
      EnrolledStudentEditorPTableComponent,
      EnrolledStudentEditorFormComponent,
    ],

    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      EditorHierarchySharedModule,

      StoreModule.forFeature('enrolledStudents', enrolledStudentReducer),
      EffectsModule.forFeature([EnrolledStudentEffects]),

      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),

      AgGridModule,
      TableModule,

      RouterModule.forChild(routes),

    ],
    providers: [EnrolledStudentService, BsModalService, ],
  })
  export class EnrolledStudentModule {}
  