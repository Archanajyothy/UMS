import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  myData: any;

  constructor(private http : HttpClient){}

  api: string = ''

  getData(apiUrl: any, token: any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = environment.baseUrl + apiUrl;
    this.myData = this.http.get(url, { headers })
    return this.myData
  }


  postData(data: any, apiUrl: string, token?: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const url = environment.baseUrl + apiUrl;
    return this.http.post(url, data, { headers });
  }

  deleteUser(userId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const apiUrl = `${environment.baseUrl}/admin/users/${userId}`;

    return this.http.delete(apiUrl, { headers });
  }



  // postData(data: any, apiUrl: any, token: any){
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`,
  //   })
  //   this.api = environment.baseUrl+apiUrl
  //   console.log(this.api); 
  //   return this.http.post(this.api,data,{headers})
  // }

  // isLoggedIn(){
  //   return !!localStorage.getItem('token')
  // }

}
