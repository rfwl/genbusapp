/* Copyright (c) 2025 j2code.app - Licensed under the MIT License (see LICENSE file for details) */


  import { Component, OnInit } from '@angular/core'
  import { Router } from '@angular/router'
  import { FormBuilder } from '@angular/forms'
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
  import { Store, select } from '@ngrx/store'
  import { Update } from '@ngrx/entity'

  import { EnumEditorOperationType, show_CodeOutput_Modal, deepClone, display_DataArray_In_GridCell } from '../../editor-hierarchy-shared/editor-hierarchy-shared.component'

  import { EnrolledStudentEditorFormComponent } from '../editor-form/enrolled-student-editor-form.component'

  import { EnrolledStudentActionTypes, EnrolledStudentState, selectAllEnrolledStudents } from '../enrolled-student.store'
  import { EnrolledStudent, Enum_EditorComponent_Type } from '../enrolled-student.model'
  import { EnrolledStudentService } from '../enrolled-student.service'

import { StudentAddressRecordChildEditorFormComponent } from "../student-address-record/editor-form/student-address-record-child-editor-form.component";

import { ContactChildEditorFormComponent } from "../contact/editor-form/contact-child-editor-form.component";



  @Component({
    selector: "enrolled-student-editor-ptable",

templateUrl: './enrolled-student-editor-ptable.component.html', 

styleUrls: ['./enrolled-student-editor-ptable.component.scss'] 

}) 

  export class EnrolledStudentEditorPTableComponent implements OnInit {

    //#region Main
    agGridThemeName: string = 'ag-theme-alpine-dark'
    delegate_display_DataArray_In_GridCell = display_DataArray_In_GridCell
    isInModal: boolean = false
    editedObjects?: any[] = undefined

    constructor(public bsModalRef: BsModalRef,
      private fb: FormBuilder,
      private router: Router,
      private store: Store,
      private codegenEntityService: EnrolledStudentService,
      private modalService: BsModalService ){

    }


    ngOnInit() {

      this.editedObjects = []

      this.store.dispatch(EnrolledStudentActionTypes.loadEnrolledStudents())
      this.store.pipe(select(selectAllEnrolledStudents)).subscribe (entLst => {
        this.editedObjects = entLst.map<EnrolledStudent>(ent => {
          let ent1 = deepClone(ent)
          return EnrolledStudent.createFrom(ent1)
        })
      })

    } // end of fucntion

    hideEditorPTable(event: any){
      this.bsModalRef.hide()
    }

    runtimeMessageLines: string[] = []

    dspMsg(msg: string){
      //if(!this.runtimeMessageLines)
      this.runtimeMessageLines = []
      //this.runtimeMessageLines.push(msg)
    }

    clrMsg(){
      this.runtimeMessageLines = []
    }

    outputJsonString(){

      let str = JSON.stringify(this.editedObjects, null, 4)
      show_CodeOutput_Modal(this.modalService, 'EnrolledStudents', str, 'modal-xl')
    }

    //#endregion

    //#region Row Record Editors

    // When child editors return to the top editor ptable, save the changes to DB.
    curSelectedEnrolledStudent: any

    save_SelectedEnrolledStudent(){
      const update: Update<EnrolledStudent> = {
        id:  this.curSelectedEnrolledStudent.id,
        changes: deepClone(this.curSelectedEnrolledStudent)
      }
      this.store.dispatch(EnrolledStudentActionTypes.updateEnrolledStudent({ update }))
      this.dspMsg('EnrolledStudent with id = ' + update.id + ' was updated and saved to DB.')
    }


    showCreateForm(field: string, rowIndex: number = undefined) {
      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          parentEditor: this,
          parentOnClosedHandler: this.onClosedRowEditor_create,
          parentDataArray: this.editedObjects,
          parentDataIndex: undefined,
          parentDataObject: undefined,
          parentDataField: undefined,
          editorOperationType: EnumEditorOperationType.Create
        }
      }
      let modalRef = this.modalService.show(EnrolledStudentEditorFormComponent, config)
      EnrolledStudent.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_create(resultObject: any){

      this.store.dispatch(EnrolledStudentActionTypes.createEnrolledStudent({ enrolledStudent: {...resultObject } }))
      this.dspMsg('EnrolledStudent with id = ' + resultObject.id + ' was created and saved to DB.')
    }

    showUpdateForm(field: string, rowIndex: number = undefined) {

      this.curSelectedEnrolledStudent = this.editedObjects[rowIndex]

      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          parentEditor: this,
          parentOnClosedHandler: this.onClosedRowEditor_update,
          parentDataArray: this.editedObjects,
          parentDataIndex: rowIndex,
          parentDataObject: undefined,
          parentDataField: undefined,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let modalRef = this.modalService.show(EnrolledStudentEditorFormComponent, config)
      EnrolledStudent.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_update(edited: EnrolledStudent){

      this.save_SelectedEnrolledStudent()
    }

    showDeleteForm(field: string, rowIndex: number = undefined) {
      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          parentEditor: this,
          parentOnClosedHandler: this.onClosedRowEditor_delete,
          parentDataArray: this.editedObjects,
          parentDataIndex: rowIndex,
          parentDataObject: undefined,
          parentDataField: undefined,
          editorOperationType: EnumEditorOperationType.Delete
        }
      }
      let modalRef = this.modalService.show(EnrolledStudentEditorFormComponent, config)
      EnrolledStudent.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedRowEditor_delete(resultObject: any){

      this.store.dispatch(EnrolledStudentActionTypes.deleteEnrolledStudent({ enrolledStudentId: resultObject.id }))
      this.dspMsg('EnrolledStudent with id = ' + resultObject.id + ' was deleted from DB.')
    }

    //#endregion

    //#region Fiele Value Editors

    private chooseFieleValueEditorComponent(fld: string): any{
      if(!fld) return undefined // unknown component.


else if( fld == "Address" ) return StudentAddressRecordChildEditorFormComponent
else if( fld == "Contact" ) return ContactChildEditorFormComponent



      return undefined
    }


    showFieldEditorForm(field: string, rowIndex: number = undefined) {

      this.curSelectedEnrolledStudent = this.editedObjects[rowIndex]

      const config: any = {
        class: 'modal-md' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedFieldEditorForm,
          parentDataArray: undefined,
          parentDataIndex: undefined,
          parentDataObject: this.editedObjects[rowIndex],
          parentDataField: field,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let cmpnt = this.chooseFieleValueEditorComponent(field)
      if(!cmpnt) return
      let modalRef = this.modalService.show(cmpnt, config)
      EnrolledStudent.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedFieldEditorForm(resultObject: any){

      this.save_SelectedEnrolledStudent()
    }

    showFieldEditorPTable(field: string, rowIndex: number = undefined) {

      this.curSelectedEnrolledStudent = this.editedObjects[rowIndex]

      const config: any = {
        class: 'modal-xl' , backdrop: true, ignoreBackdropClick: true,
        initialState: {
          isInModal: true,
          parentEditor: this,
          parentOnClosedHandler: this.onClosedFieldEditorPTable,
          parentDataArray: undefined,
          parentDataIndex: undefined,
          parentDataObject: this.editedObjects[rowIndex],
          parentDataField: field,
          editorOperationType: EnumEditorOperationType.Update
        }
      }
      let cmpnt = this.chooseFieleValueEditorComponent(field)
      if(!cmpnt) return
      let modalRef = this.modalService.show(cmpnt, config)
      EnrolledStudent.topComponentType = Enum_EditorComponent_Type.EditorPTable
    }

    onClosedFieldEditorPTable(resultObject: any){
      this.save_SelectedEnrolledStudent()
    }


    //#endregion

  } // end of class

