import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material/material-module';
import { SharedModule } from '../shared/shared-module';
import { CreateEditUserDialogComponent } from './users-tab/create-edit-user-dialog/create-edit-user-dialog.component';
import { UsersTabComponent } from './users-tab/users-tab.component';

@NgModule({
    declarations: [
        CreateEditUserDialogComponent,
        UsersTabComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        CreateEditUserDialogComponent,
        UsersTabComponent
    ]
})
export class UsersModule {}