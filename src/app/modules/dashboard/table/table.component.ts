import { Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';


export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  
})
export class TableComponent implements AfterViewInit, OnInit{
  userArray = []
  displayedColumns: string[] = ['id', 'firstName', 'email', 'role', 'edit' , 'delete'];
  dataSource = new MatTableDataSource<any>([this.userArray]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  apiUrl = '/admin/users' 
  token = localStorage.getItem('token')
  constructor(private auth : AuthService, private dialog : MatDialog){}

  ngOnInit(): void {
    this.auth.getData(this.apiUrl, this.token).subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res?.data?.users;
      console.log('from table');
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  openDialog(element: any){
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: { element, editMode: true }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // Perform any action after dialog is closed, if needed
    });
  }

  deleteUser(userId: number): void {
    if (this.token !== null && confirm('Are you sure you want to delete this user?')) {
      this.auth.deleteUser(userId, this.token).subscribe(
        (res) => {
          console.log('User deleted successfully');
          console.log(res);
          if (res?.status === 'true') {
            this.dataSource.data = this.dataSource.data.filter((user: any) => user.id !== userId);
            // Refresh paginator after data change
            this.dataSource.paginator?.firstPage();
          } else {
            console.error('User deletion failed');
          }
          
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
}

}



