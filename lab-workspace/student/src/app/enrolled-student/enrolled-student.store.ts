/* Copyright (c) 2025 j2code.app - Licensed under the MIT License (see LICENSE file for details) */

  import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
  import { createReducer, createAction, on, props } from "@ngrx/store";
  import { Update } from "@ngrx/entity";
  import { createSelector, createFeatureSelector } from "@ngrx/store";
  import { createEffect, Actions, ofType } from "@ngrx/effects";
  import { catchError, concatMap, find, map, mergeMap, tap } from "rxjs/operators";
  import { Injectable } from "@angular/core";
  import { Router } from "@angular/router";
  import { Observable } from "rxjs";

  import { EnrolledStudent  } from "./enrolled-student.model";
  import { EnrolledStudentService } from "./enrolled-student.service";
  
  // ========================================== NGRX Store State
  export interface EnrolledStudentState extends EntityState<EnrolledStudent> {
    enrolledStudentsLoaded: boolean
    selectedEnrolledStudent: EnrolledStudent | undefined
  }
  export const adapterEnrolledStudent: EntityAdapter<EnrolledStudent> = createEntityAdapter<EnrolledStudent>({
  });
  export const initialEnrolledStudentState : EnrolledStudentState = adapterEnrolledStudent.getInitialState({
    enrolledStudentsLoaded: false,
    selectedEnrolledStudent: undefined,
  });
  
  // ========================================== NGRX Store Actions
  export const loadEnrolledStudents = createAction(
    "[EnrolledStudent List] Load EnrolledStudents via Service"
  );

  export const enrolledStudentsLoaded = createAction(
    "[EnrolledStudent Effect] EnrolledStudents Loaded Successfully",
    props<{ enrolledStudents: EnrolledStudent[] }>()
  );

  export const createEnrolledStudent = createAction(
    "[Create EnrolledStudent Component] Create EnrolledStudent",
    props<{ enrolledStudent: any }>()
  );

  export const enrolledStudentCreated = createAction(
    "[Create EnrolledStudent Component] EnrolledStudent Created",
    props<{ enrolledStudent: EnrolledStudent }>()
  );

  export const deleteEnrolledStudent = createAction(
    "[EnrolledStudent List Operations] Delete EnrolledStudent",
    props<{ enrolledStudentId: string }>()
  );

  export const updateEnrolledStudent = createAction(
    "[EnrolledStudent List Operations] Update EnrolledStudent",
    props<{ update: Update<EnrolledStudent> }>()
  );

  export const selectEnrolledStudent = createAction(
    "[EnrolledStudent List Operations] Select EnrolledStudent",
    props<{ selected: EnrolledStudent }>()
  );

  export const EnrolledStudentActionTypes = {
    loadEnrolledStudents,
    enrolledStudentsLoaded,
    createEnrolledStudent,
    enrolledStudentCreated,
    deleteEnrolledStudent,
    updateEnrolledStudent,
    selectEnrolledStudent
  }
  
  // ========================================== NGRX Store Reducer
  export const enrolledStudentReducer = createReducer(
    initialEnrolledStudentState,

    on(EnrolledStudentActionTypes.enrolledStudentsLoaded, (state, action) => {
      return adapterEnrolledStudent.addMany(action.enrolledStudents, { ...state, enrolledStudentsLoaded: true });
    }),

    on(EnrolledStudentActionTypes.enrolledStudentCreated, (state, action) => {
      return adapterEnrolledStudent.addOne(action.enrolledStudent, state);
    }),

    on(EnrolledStudentActionTypes.deleteEnrolledStudent, (state, action) => {
      return adapterEnrolledStudent.removeOne(action.enrolledStudentId, state);
    }),

    on(EnrolledStudentActionTypes.updateEnrolledStudent, (state, action) => {
      return adapterEnrolledStudent.updateOne(action.update, state);
    }),

  )
  
  // ========================================== NGRX Store Selectors
  const { selectAll, selectIds } = adapterEnrolledStudent.getSelectors();

  export const enrolledStudentsFeatureSelector = createFeatureSelector<EnrolledStudentState>(
    "enrolledStudents"
  )

  export const selectAllEnrolledStudents = createSelector(enrolledStudentsFeatureSelector, selectAll );

  export const areEnrolledStudentsLoaded = createSelector(
    enrolledStudentsFeatureSelector,
    state => state.enrolledStudentsLoaded
  )
  
  // ========================================== NGRX Store Effects
  @Injectable()
  export class EnrolledStudentEffects {

    constructor(
      private enrolledStudentService: EnrolledStudentService,
      private actions$: Actions,
      private router: Router
    ) {}

    loadEnrolledStudents$ = createEffect(() =>
      this.actions$.pipe(
        ofType(EnrolledStudentActionTypes.loadEnrolledStudents),
        concatMap(() => this.enrolledStudentService.loadEnrolledStudents()),
        map(enrolledStudents => EnrolledStudentActionTypes.enrolledStudentsLoaded({ enrolledStudents }))
      ),
      { dispatch: true }

    );

    createEnrolledStudent$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(EnrolledStudentActionTypes.createEnrolledStudent),
          tap(action => this.enrolledStudentService.createEnrolledStudent(action.enrolledStudent)),
          map( action => EnrolledStudentActionTypes.enrolledStudentCreated({ enrolledStudent: action.enrolledStudent }))
        ),
      { dispatch: true }
    );

    deleteEnrolledStudent$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(EnrolledStudentActionTypes.deleteEnrolledStudent),
          tap(action => this.enrolledStudentService.deleteEnrolledStudent(action.enrolledStudentId)),
        ),
      { dispatch: false }
    );

    updateEnrolledStudent$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(EnrolledStudentActionTypes.updateEnrolledStudent),
          tap(action => this.enrolledStudentService.updateEnrolledStudent(action.update.id.toString(), action.update.changes ) )
        ),
      { dispatch: false }
    );

  } //end of class
  