import { Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { CommonService } from '../../../services/common.service';
import { Subscription } from 'rxjs';
import { DeleteModalComponent } from '../../../components/delete-modal/delete-modal.component';


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
  showSpinner = false;
  role = localStorage?.getItem('role');
  userData: any =[]

  itemsPerPage: any;
  currentPage:any = 1;
  totalCount: any;
  maxPageLinks: number = 5;

  displayedColumns: string[] = []
  dataSource = new MatTableDataSource<any>([this.userArray]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  apiUrl = '/admin/users' 
  token = localStorage?.getItem('token')
  behaviorSubjectSubscription: Subscription | undefined;
  
  constructor(private auth : AuthService, private common : CommonService, private dialog : MatDialog,){}

  ngOnInit(): void {
    this.getUserData()
    this.common.behaviorSubject.subscribe((res:any) => {
      const user = res
      if(user){
        this.getUserData()
      }
    }) 
  }

  getUserData(){
    // loader start
    const dataLoader = setTimeout(()=>{
      this.showSpinner = true
    },)

    setTimeout(() => { //closes the spinner
          this.showSpinner = false
          clearTimeout(dataLoader);
          console.log('Timeout cleared after 2 seconds');
        }, 2000); // Loader end
  
    if(this.role === 'admin'){
      this.displayedColumns = ['id', 'firstName', 'lastName', 'role', 'edit' , 'delete'];
      this.auth.getData(this.apiUrl, this.token).subscribe((res: any) => {
        this.userData = res?.data?.users;
        this.totalCount = res.data.totalCount
        console.log('UserData',this.userData);
        console.log('from table');
        this.common.behaviorSubject.subscribe((res:any) => {
          const newUser = res.data.user;
          console.log(newUser,'from behavior');
  
          if(res){
            console.log('after behavior, inside if ');
            this.userData.push(newUser)
          }
          
        })
  
      });
    }

    if(this.role === 'supervisor'){
      const apiUrl = "/supervisor/users"
      this.auth.getData(apiUrl, this.token).subscribe((res: any) => {
        console.log(res);
        this.userData = res?.data?.users
        console.log('from table');
        
        this.common.behaviorSubject.subscribe((res:any) => {
          const newUser = res.data.user;
          console.log(newUser,'from behavior');
          if(res){
            console.log('after behavior, inside if ');
            this.userData.push(newUser)
          }
          
        })
  
      });
    }
   
  }


  // Adjustments to the pageChange function
  pageChanged(event: any) {
    this.currentPage = event;
    const api = `/admin/users?limit=10&page=${this.currentPage}`;
    this.auth.getData(api, this.token).subscribe((res: any) => {
      console.log(res);
      this.userData = res?.data?.users;
      this.totalCount = res?.data?.totalCount;
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

  openDeleteModal(userId: number): void {
    const dialogRef = this.dialog.open(DeleteModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Perform logout action here
        console.log('User confirmed logout');
        this.deleteUser(userId);
      } else {
        console.log('User canceled logout');
      }
    });
  }

  deleteUser(userId: number): void {
    if (this.token !== null) {
      this.auth.deleteUser(userId, this.token).subscribe(
        (res) => {
          console.log('User deleted successfully');
          console.log(res);
          if (res?.status === 'true') {
            this.dataSource.data = this.dataSource.data.filter((user: any) => user.id !== userId);
            this.userData = this.userData.filter((user: any) => user.id !== userId);
            console.log('userdata after delete',this.userData);
            
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

onSearch(searchValue: string){
  const api = `/admin/users?limit=10&page=1&search=${searchValue}`
  this.auth.getData(api, this.token).subscribe((res: any) => {
    console.log(res);
    this.dataSource.data = res?.data?.users;
    this.userData = res?.data?.users;
    console.log('search');
   
  });
}

}



