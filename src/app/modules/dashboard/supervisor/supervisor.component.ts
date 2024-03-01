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

  token = localStorage.getItem('token') 
  constructor(private auth : AuthService){}

  ngOnInit(): void {
    //const supervisorUserId = localStorage.getItem('id'); 
    const apiUrl = `/supervisor/users`    
      this.auth.getData(apiUrl, this.token).subscribe((res: any) => {
        console.log('from supervisor');
        console.log(res);
        this.dataSource.data = res?.data?.users; //assigning data for the table
      });   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
