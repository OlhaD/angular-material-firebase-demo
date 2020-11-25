import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityActionType } from 'src/app/shared/enums/entityActionType';
import { User } from 'src/app/shared/interfaces/user';
import { BirthdayValidator } from 'src/app/shared/validators/dateValidator';
import { DialogData } from '../../shared/interfaces/dialogData';

@Component({
    selector: 'create-edit-user-dialog',
    templateUrl: 'create-edit-user-dialog.component.html',
    styleUrls: ['create-edit-user-dialog.component.css']
})
export class CreateEditUserDialogComponent implements OnInit {
    user: User;
    form: FormGroup;
    isInEditMode: boolean;
    
    minDate: Date = new Date(1900, 1, 1);
    maxDate: Date = new Date();
    private defaultDateOfBirth: Date = new Date(1970, 1, 1);

    constructor(
        public dialogRef: MatDialogRef<CreateEditUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData<User>      
    ) {
        dialogRef.disableClose = true;
        this.isInEditMode = data.action == EntityActionType.Edit;
        debugger;
        this.user = {...data.entity};
    } 

    ngOnInit(): void {
        if(!this.user.id){
            this.resetUser();
        }

        this.form = new FormGroup({
            firstName: new FormControl(this.user.firstName, [Validators.required]),
            lastName: new FormControl(this.user.lastName, [Validators.required]),
            dateOfBirth: new FormControl(this.user.dateOfBirth, [Validators.required, BirthdayValidator()]),
            isActive: new FormControl(this.user.isActive, []),
            points: new FormControl(this.user.points, [Validators.required, Validators.min(-100), Validators.max(100)])
        })
    }

    onCancelClick(): void {
        this.resetUser();
        this.dialogRef.close();
    }

    private resetUser(){
        this.user = {
            firstName: "",
            lastName: "",
            dateOfBirth: this.defaultDateOfBirth,
            isActive: true,
            points: 0,
        };
    }

    submit(){
        if(!this.form.valid){
            this.form.get('firstName').markAsTouched();
            this.form.get('lastName').markAsTouched();
            this.form.get('dateOfBirth').markAsTouched();
            this.form.get('points').markAsTouched();
            this.form.get('isActive').markAsTouched();

            return false;
        }

        this.dialogRef.close(this.user);
    }    
}

