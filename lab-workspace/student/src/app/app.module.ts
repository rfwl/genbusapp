/* Copyright (c) 2025 j2code.app - Licensed under the MIT License (see LICENSE file for details) */


  import { CommonModule } from "@angular/common";
  import { NgModule } from "@angular/core";
  import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
  import { provideFirestore, getFirestore } from "@angular/fire/firestore";
  import { ReactiveFormsModule } from "@angular/forms";
  import { BrowserModule } from "@angular/platform-browser";
  import { RouterModule } from "@angular/router";
  import { EffectsModule } from "@ngrx/effects";
  import { StoreModule } from "@ngrx/store";
  import { AgGridModule } from "ag-grid-angular";
  import { TabsModule } from 'ngx-bootstrap/tabs';
  import { BsModalService } from "ngx-bootstrap/modal";
  import { AppComponent } from "./app.component";
  import { reducers, metaReducers } from "./app.store";
  import {default as settings} from "../assets/j2code_config.json"

  import { EnrolledStudentModule } from './enrolled-student/enrolled-student.module'
  import { EnrolledStudentEffects } from './enrolled-student/enrolled-student.store'
  
  @NgModule({
    imports: [
      BrowserModule,
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      TabsModule,
  
      AgGridModule,
      StoreModule.forRoot(reducers, {metaReducers }),
      EffectsModule.forRoot([
        EnrolledStudentEffects
      ]), // Must be here
  
      EnrolledStudentModule,
  
    ],
  
    declarations: [
      AppComponent,
  
    ],
    exports: [
    ],
    providers: [BsModalService,
      provideFirebaseApp(() => initializeApp(settings.Firebase_Connection)), // for angularfire/auth
      provideFirestore(() => getFirestore()), // for angularfire/auth
  
  
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { } // 2 lines (import {...}) + 3 Lines (in imports: [...]) to add the generated source code files.
  
  