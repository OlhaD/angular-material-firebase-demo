import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { UsersTabComponent } from './users-tab/users-tab.component';
import { RolesTabComponent } from './roles-tab/roles-tab.component';
import { MaterialModule } from './shared/material/material-module';
import { CreateEditRoleDialogComponent } from './roles-tab/components/create-edit-role-dialog/create-edit-role-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionResultSnackbarComponent } from './shared/components/action-result-snackbar/action-result-snackbar.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { CreateEditUserDialogComponent } from './users-tab/create-edit-user-dialog/create-edit-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    UsersTabComponent,
    RolesTabComponent,
    CreateEditRoleDialogComponent,
    CreateEditUserDialogComponent,
    ActionResultSnackbarComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
