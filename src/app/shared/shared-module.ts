import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionResultSnackbarComponent } from './components/action-result-snackbar/action-result-snackbar.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MaterialModule } from './material/material-module';

@NgModule({
    declarations: [
        ActionResultSnackbarComponent,
        ConfirmationDialogComponent,        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        ActionResultSnackbarComponent,
        ConfirmationDialogComponent,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class SharedModule{}