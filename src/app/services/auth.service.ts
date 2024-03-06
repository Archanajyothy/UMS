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
      // 'Content-Type': 'application/json',
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

  putData(apiUrl: string, data:object, token: any){
    const url = `${environment.baseUrl}${apiUrl}`
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    )
    return this.http.put(url,data,{headers})
  }

  // Function to send PATCH request to update user data
  patchUserData(userId: number, userData: any, token: string): Observable<any> {
    const url = `${environment.baseUrl}/admin/users/${userId}`;
    return this.http.patch(url, userData, { headers: { Authorization: `Bearer ${token}` } });
  }

}
