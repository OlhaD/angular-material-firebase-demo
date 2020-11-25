import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { ActionResultType } from '../../shared/enums/actionResultType';
import { Role } from '../../shared/interfaces/role';
import { CreateEditRoleDialogComponent } from './components/create-edit-role-dialog/create-edit-role-dialog.component';
import { RoleService } from './services/role.service';
import { ActionResultService } from '../../shared/components/action-result-snackbar/services/action-result.service';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { EntityActionType } from '../../shared/enums/entityActionType';
import { DialogData } from '../../shared/interfaces/dialogData';

@Component({
  selector: 'app-roles-tab',
  templateUrl: './roles-tab.component.html',
  styleUrls: ['./roles-tab.component.css']
})
export class RolesTabComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'comment', 'actions'];
  dataSource: MatTableDataSource<Role>;
  roleForEdit: Role;

  private dialogWidth: string = "40rem";
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public roleService: RoleService,
    public actionResultSnackbarService: ActionResultService
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.roleService.getAll().subscribe(
      (resp: Role[]) => {
        this.dataSource = new MatTableDataSource<Role>(resp);
        this.dataSource.sort = this.sort;
        // make sorting case-insensitive
        this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
        this.dataSource.paginator = this.paginator;
      } 
    )
  }

  openCreateDialog(): void{
    this.openCreateEditDialog(EntityActionType.Create, 
      (result) => {
          this.roleService.create(result)
          .subscribe(() => {
            this.showAlert("Role was successfully created!", ActionResultType.Success);
          }, () => {
            this.showAlert("Error: Role was not created!", ActionResultType.Error);
        });     
    });
  }

  openEditDialog(role: Role): void{
    this.openCreateEditDialog(
      EntityActionType.Edit, 
      (result) => {
          this.roleService.update(result)
          .subscribe(() => {
            this.showAlert("Role was successfully updated!", ActionResultType.Success);
          }, () => {
            this.showAlert("Error: Role was not updated!", ActionResultType.Error);
        });     
      },
      role
    );
  }  

  private openCreateEditDialog(entityActionType: EntityActionType, callback: Function, role?: Role): void{
    if(entityActionType == EntityActionType.Edit && !role){
      this.showAlert("Error: Role was not updated!", ActionResultType.Error);
      return;
    }

    let data: DialogData<Role> = {
      action: entityActionType,
      entity: role
    }

    const dialogRef = this.dialog.open(CreateEditRoleDialogComponent, {
      width: this.dialogWidth,
      data: data,
      panelClass: 'dialog' 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result.name){
        return;
      }
      
      callback(result);
    });
  }  

  openDeleteConfirmationDialog(role: Role): void{
    let title: string = "Delete";
    let message: string = `Are you sure you want to delete role ${role.name}?`;
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
      
      this.roleService.delete(role.id).subscribe(() => {
        this.showAlert("Role was successfully deleted!", ActionResultType.Success);
      }, () => {
        this.showAlert("Error: Role was not deleted!", ActionResultType.Error);
      });      
    })
  }

  private showAlert(message: string, type: ActionResultType): void{
    this.actionResultSnackbarService.openSnackBar(message, type);
  }
}