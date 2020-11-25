import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared-module';
import { CreateEditRoleDialogComponent } from './roles-tab/components/create-edit-role-dialog/create-edit-role-dialog.component';
import { RolesTabComponent } from './roles-tab/roles-tab.component';

@NgModule({
    declarations: [
        CreateEditRoleDialogComponent,
        RolesTabComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        CreateEditRoleDialogComponent,
        RolesTabComponent
    ]
})
export class RolesModule { }