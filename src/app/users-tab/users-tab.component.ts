import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { User } from '../shared/interfaces/user';
import { UserService } from './services/user.service';
import { CreateEditRoleDialogComponent } from '../roles-tab/components/create-edit-role-dialog/create-edit-role-dialog.component';

@Component({
  selector: 'app-users-tab',
  templateUrl: './users-tab.component.html',
  styleUrls: ['./users-tab.component.css']
})
export class UsersTabComponent implements OnInit, AfterViewInit {
  entities = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'points', 'isActive', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.userService.getAll().subscribe(
      (resp: User[]) => {
        this.entities = resp.map(x => {
          return {
            ...x,
            dateOfBirth: this.toDateTime(x.dateOfBirth)
          }
        });

        this.dataSource = new MatTableDataSource<User>(this.entities);
        this.dataSource.paginator = this.paginator; 
      } 
    )
  }

  private toDateTime(time) {
    let t = new Date(1970, 0, 1); // Epoch
    return t.setSeconds(time.seconds);
  }
}
