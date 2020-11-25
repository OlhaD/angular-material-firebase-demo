import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { User } from '../shared/interfaces/user';
import { UserService } from './services/user.service';
import { MatSort } from '@angular/material/sort';
import { EntityActionType } from '../shared/enums/entityActionType';
import { ActionResultType } from '../shared/enums/actionResultType';
import { CreateEditUserDialogComponent } from './create-edit-user-dialog/create-edit-user-dialog.component';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ActionResultService } from '../shared/components/action-result-snackbar/services/action-result.service';
import { DialogData } from '../shared/interfaces/dialogData';

@Component({
  selector: 'app-users-tab',
  templateUrl: './users-tab.component.html',
  styleUrls: ['./users-tab.component.css']
})
export class UsersTabComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'points', 'isActive', 'actions'];
  dataSource: MatTableDataSource<User>;

  private dialogWidth: string = "50rem";

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    public actionResultSnackbarService: ActionResultService
    ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.userService.getAll().subscribe(
      (resp: User[]) => {
        let entities: User[] = resp.map(x => {
          return {
            ...x,
            dateOfBirth: this.toDateTime(x.dateOfBirth)
          }
        });

        this.dataSource = new MatTableDataSource<User>(entities);
        this.dataSource.sort = this.sort;
        // make sorting case-insensitive
        this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
          let value = data[sortHeaderId];
          if(typeof value.toLocaleLowerCase === 'function'){
            return data[sortHeaderId].toLocaleLowerCase()
          }
          return value;
        };
        this.dataSource.paginator = this.paginator; 
      } 
    )
  }

  private toDateTime(time) {
    let t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(time.seconds);
    return new Date(t);
  }

  openCreateDialog(): void{
    this.openCreateEditDialog(EntityActionType.Create, 
      (result) => {
          this.userService.create(result)
          .subscribe(() => {
            this.showAlert("User was successfully created!", ActionResultType.Success);
          }, () => {
            this.showAlert("Error: User was not created!", ActionResultType.Error);
        });     
    });
  }

  openEditDialog(user: User): void{
    this.openCreateEditDialog(
      EntityActionType.Edit, 
      (result) => {
          this.userService.update(result)
          .subscribe(() => {
            this.showAlert("User was successfully updated!", ActionResultType.Success);
          }, () => {
            this.showAlert("Error: User was not updated!", ActionResultType.Error);
        });     
      },
      user
    );
  }  

  private openCreateEditDialog(entityActionType: EntityActionType, callback: Function, user?: User): void{
    if(entityActionType == EntityActionType.Edit && !user){
      this.showAlert("Error: User was not updated!", ActionResultType.Error);
      return;
    }

    let data: DialogData<User> = {
      action: entityActionType,
      entity: user
    }
    
    const dialogRef = this.dialog.open(CreateEditUserDialogComponent, {
      width: this.dialogWidth,
      data: data,
      panelClass: 'dialog' 
    });

    dialogRef.afterClosed().subscribe(result => {      
      callback(result);
    });
  }  

  openDeleteConfirmationDialog(user: User): void{
    let title: string = "Delete";
    let message: string = `Are you sure you want to delete a user '${user.lastName}' '${user.firstName}'?`;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: title,
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return;
      }
      
      this.userService.delete(user.id).subscribe(() => {
        this.showAlert("User was successfully deleted!", ActionResultType.Success);
      }, () => {
        this.showAlert("Error: User was not deleted!", ActionResultType.Error);
      });      
    })
  }

  private showAlert(message: string, type: ActionResultType): void{
    this.actionResultSnackbarService.openSnackBar(message, type);
  }
}
