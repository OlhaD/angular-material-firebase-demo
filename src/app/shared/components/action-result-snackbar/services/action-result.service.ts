import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionResultType } from 'src/app/shared/enums/actionResultType';

@Injectable({providedIn: 'root'})
export class ActionResultService{
    constructor(
        private _snackBar: MatSnackBar
        ) { }

    openSnackBar(message: string, actionResultType: ActionResultType) {
        let customClass = "me";
        switch(actionResultType){
          case ActionResultType.Success: {
            customClass = "success";
            break;
          }
          case ActionResultType.Error: {
            customClass = "error";
            break;
          }
          case ActionResultType.Info: {
            customClass = "info";
            break;
          }
        }
    
        this._snackBar.open(message, "", {
          duration: 2000,
          panelClass: [customClass]
        });
      }
}