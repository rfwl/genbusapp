/* Copyright (c) 2025 j2code.app - Licensed under the MIT License (see LICENSE file for details) */

    import { Injectable, inject } from "@angular/core"
    import { Observable, of } from "rxjs"
    import { map } from "rxjs/operators"
    import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from "@angular/fire/firestore"

    import { EnrolledStudent } from "./enrolled-student.model"

    @Injectable()
    export class EnrolledStudentService {
      constructor() {

      }
      private firestore: Firestore = inject(Firestore)

      get path_col_EnrolledStudents(): string {
        return "enrolled-students"
      }

      loadEnrolledStudents(): Observable<EnrolledStudent[]> {

        const itemCollection = collection(this.firestore, this.path_col_EnrolledStudents)
        return collectionData(itemCollection).pipe( map( das => {
          return (das.map( da => {
            let obj = { ...da }
            let usr = new EnrolledStudent()
            usr.fromValueObject(obj)
            return usr
          }))
        }))

      } // end of function

      createEnrolledStudent(enrolledStudent: any){
        setDoc(doc(this.firestore, this.path_col_EnrolledStudents, enrolledStudent.id), enrolledStudent)
        .then(() => {
            //console.log("Document successfully Added!");
          }).catch((error: any) => {
            //console.error("Error adding document: ", error);
          })

      } // end of function

      deleteEnrolledStudent(recId: string){

        deleteDoc(doc(this.firestore, this.path_col_EnrolledStudents, recId))
        .then(() => {
          //console.log("Document successfully deleted!");
        }).catch((error: any) => {
          //console.error("Error deleting document: ", error);
        })

      } // end of function

      updateEnrolledStudent( recId: string, changes: Partial<EnrolledStudent> ) {
          var recChanges: any = { ...changes, id: recId, }
          setDoc(doc(this.firestore, this.path_col_EnrolledStudents, recId), recChanges)
          .then(() => {
            //console.log("Document successfully updated!");
          }).catch((error: any) => {
            //console.error("Error updating document: ", error);
          })

      }  // end of function

    } // end of class
    