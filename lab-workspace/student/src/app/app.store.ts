/* Copyright (c) 2025 j2code.app - Licensed under the MIT License (see LICENSE file for details) */

  import { ActionReducerMap, MetaReducer } from "@ngrx/store"
  import { EnrolledStudentState, enrolledStudentReducer } from "./enrolled-student/enrolled-student.store"

  export interface AppState {
    
    enrolledStudent: EnrolledStudentState
    
  }

  export const reducers: ActionReducerMap<AppState> = {
    
    enrolledStudent: enrolledStudentReducer,
    
  }  
  
  export const metaReducers: MetaReducer<AppState>[] =  [];

  