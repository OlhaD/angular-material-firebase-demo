import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityActionType } from 'src/app/shared/enums/entityActionType';
// import { timeStamp } from 'console';
import { Role } from 'src/app/shared/interfaces/role';
import { DialogData } from './interfaces/dialogData';

@Component({
    selector: 'create-edit-role-dialog',
    templateUrl: 'create-edit-role-dialog.component.html',
    styleUrls: ['create-edit-role-dialog.component.css']
})
export class CreateEditRoleDialogComponent implements OnInit {
    role: Role;
    form: FormGroup;
    isInEditMode: boolean;

    constructor(
        public dialogRef: MatDialogRef<CreateEditRoleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData        
    ) {
        dialogRef.disableClose = true;
        this.isInEditMode = data.action == EntityActionType.Edit;
        this.role = {...data.role};
    } 

    ngOnInit(): void {
        if(!this.role){
            this.resetRole();
        }

        this.form = new FormGroup({
            name: new FormControl(this.role.name, [Validators.required, Validators.maxLength(100)]),
            comment: new FormControl(this.role.comment, [Validators.maxLength(250)])
        })
    }

    onCancelClick(): void {
        this.resetRole();
        this.dialogRef.close();
    }

    private resetRole(){
        this.role = {
            name: "",
            comment: ""
        };
    }

    submit(){
        if(!this.form.valid){
            this.form.get('name').markAsTouched();
            this.form.get('comment').markAsTouched();

            return false;
        }

        this.dialogRef.close(this.role);
    }    
}

