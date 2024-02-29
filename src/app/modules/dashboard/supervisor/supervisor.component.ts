import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrl: './supervisor.component.css'
})
export class SupervisorComponent {
  userArray = []
  displayedColumns: string[] = ['id', 'firstName', 'role', 'email'];
  dataSource = new MatTableDataSource<any>([this.userArray]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  apiUrl = '/supervisor/users'
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
