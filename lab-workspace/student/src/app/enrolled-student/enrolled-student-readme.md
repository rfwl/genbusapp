

# Configuration and Integration Guide

This guide details how to configure the application's connection to a Firestore database and how to integrate the generated code modules.

---

## 1. Connecting the Generated Application to a Firestore Database

The application includes a default setup for connecting to a Firestore database. **It is critical to change this default configuration** for any production or private use.

### 1.1. Default Firestore Configuration

The connection details are stored in the configuration file:

* **Configuration File:** `src/assets/j2code_config.json`

This file contains a `Firebase_Connection` object with the necessary credentials:

```json
"Firebase_Connection": {
  "apiKey": "xxxxxxxxxxxxxxxx",
  "authDomain": "xxxxxxxxxxxxxxxx",
  "projectId": "xxxxxxxxxxxxxxxx",
  "storageBucket": "xxxxxxxxxxxxxxxx",
  "messagingSenderId": "xxxxxxxxxxxxxxxx",
  "appId": "xxxxxxxxxxxxxxxxxxxxxxxxx",
  "measurementId": "xxxxxxxxxxxxxxxx"
}
```

### 1.2. Application Module Setup

The connection is initialized within the main application module:

  * **File:** `src/app/app.module.ts`

The configuration is imported:

```typescript
import { default as settings } from "../assets/j2code_config.json";
```

And the Firebase connection is initialized in the `@NgModule` providers:

```typescript
provideFirebaseApp(() => initializeApp(settings.Firebase_Connection)),
```

### 1.3.   Critical Security Note

The default details in `j2code_config.json` point to a **sample database that is publicly accessible**. **NEVER save any private or sensitive data** to this sample database. Ensure you replace these details with your own before storing any meaningful information.

-----

## 2. Connecting to Your Own Firestore Database

Follow these steps to configure the application to connect to your private Firestore instance:

### Step 1: Retrieve Your Firebase Configuration

1.  Sign in to the **Firebase Console**.
2.  Open your project dashboard.
3.  Click the **gear icon** to access your **Project Settings**.
4.  Under the **General** tab, locate the **Your apps** section.
5.  Click on your app to view its details.
6.  In the SDK setup and configuration section, select the **npm** option.
7.  Locate and copy the values from the **`firebaseConfig`** object in the code preview.

### Step 2: Update the Application Configuration

1.  Copy the values from the `firebaseConfig` object.
2.  Replace the corresponding fields in the `Firebase_Connection` object within `src/assets/j2code_config.json`.

> **Important:** The current configuration connects to a shared sample database accessible to all users. **Do not store private or sensitive data in this environment.** Always replace the default credentials with your own to ensure data privacy and security.

-----

## 3. Module and NGRX Integration

To use the generated module and its associated NGRX (NgRx) components, you must integrate them into your application's module and store files.

### 3.1. Reference the Generated Module (in `app.module.ts`)

Replace `./enrolled-student/` with the correct relative path to the generated files.

```typescript
// Replace "./enrolled-student/" with proper folder path

import { EnrolledStudentModule } from './enrolled-student/enrolled-student.module'
import { EnrolledStudentEffects } from './enrolled-student/enrolled-student.store'

// ... within the @NgModule decorator ...

imports: [
  // ...... other imports
  EnrolledStudentModule,
  EffectsModule.forRoot([... EnrolledStudentEffects, ...]),
  // ......
]
```

### 3.2. Define the NGRX Store State and Reducer

Update your main NGRX store definition (e.g., in `src/app/store/index.ts` or similar file). Replace `./enrolled-student/` with the correct relative path.

```typescript
// Replace "./enrolled-student/" with proper folder path

import { EnrolledStudentState, enrolledStudentReducer } from "./enrolled-student/enrolled-student.store"
import { ActionReducerMap } from "@ngrx/store" // Ensure this is imported

export interface AppState {
  // ...... other states
  enrolledStudent: EnrolledStudentState
  // ......
}

export const reducers: ActionReducerMap<AppState> = {
  // ...... other reducers
  enrolledStudent: enrolledStudentReducer,
  // ......
}
```

-----

## 4. Component Integration

To display the generated top-level components in one of your application's components:

### 4.1. Import the Component Files

Replace `./enrolled-student/editor-aggrid/`, `./enrolled-student/editor-ptable/`, and `./enrolled-student/editor-form/` with the correct relative paths.

```typescript
// Replace "" with proper folder path

import { EnrolledStudentEditorAgGridComponent } from './enrolled-student/editor-aggrid/enrolled-student-editor-aggrid.component'

import { EnrolledStudentEditorPTableComponent } from './enrolled-student/editor-ptable/enrolled-student-editor-ptable.component'

import { EnrolledStudentEditorFormComponent } from './enrolled-student/editor-form/enrolled-student-editor-form.component'
```

### 4.2. Embed Components in the Template

You can include the generated components in your HTML template (e.g., `your-component.component.html`):

```html
<enrolled-student-editor-aggrid #enrolledStudentEditorAgGridPage ></enrolled-student-editor-aggrid>

<enrolled-student-editor-ptable #enrolledStudentEditorPTablePage ></enrolled-student-editor-ptable>
```

### 4.3. Access Components in the Component Class

Use `@ViewChild` decorators in your component's TypeScript file to access the embedded components:

```typescript
import { ViewChild } from '@angular/core'; // Ensure ViewChild is imported

// ... inside your component class ...

@ViewChild('enrolledStudentEditorAgGridPage', { static: false }) enrolledStudentEditorAgGrid?: EnrolledStudentEditorAgGridComponent

@ViewChild('enrolledStudentEditorPTablePage', { static: false }) enrolledStudentEditorPTable?: EnrolledStudentEditorPTableComponent
```

```
```

  