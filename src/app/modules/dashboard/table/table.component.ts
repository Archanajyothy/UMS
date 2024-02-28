import { Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../../../services/auth.service';

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
  displayedColumns: string[] = ['id', 'firstName', 'role', 'email'];
  dataSource = new MatTableDataSource<any>([this.userArray]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  apiUrl = '/admin/users'
  token = localStorage.getItem('token')
  constructor(private auth : AuthService){}

  ngOnInit(): void {
    this.auth.getData(this.apiUrl, this.token).subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res?.data?.users;
      console.log('from table');
      console.log(this.dataSource);
      
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


