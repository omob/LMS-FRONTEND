import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ServerResponse } from '../model/serverResponse';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  URL ="http://127.0.0.1:3000";
  helper = new JwtHelperService();
  user: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(detail): Observable<ServerResponse>{

    let url = this.URL + ((detail.position != 'student') ? '/api/staff/login' : '/api/student/login');
    
    return this.http.post<ServerResponse>(url, JSON.stringify(detail), this.getHeaders())
      .pipe(
        map(response => {
          if(response.success && response.token){
            localStorage.setItem('token', response.token);
          }
          return response;
        }),
        catchError(err => of(err))
      )
  }

  
  getHeaders(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.getToken() || ""
      })
    };
    
    return httpOptions;
  }

  getToken(): string{
    const token = localStorage.getItem('token');
    if(!token) return null;

    return token;
  }

  loggedInUser():Token{
    const decodedToken = this.helper.decodeToken(this.getToken());
    return decodedToken.user;
  }

  isLoggedIn(): boolean{
    if (this.isExpired()){
      localStorage.removeItem('token');
      return false;
    }
    else return true;
  }

  isExpired(): boolean{
    const isExpired = this.helper.isTokenExpired(this.getToken());
    if(isExpired) return true;
  }
  
  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

} 

interface Token{
  _id: string;
  name: string;
  email: string;
  position: string;
  roles: any[];
  programmeId: string;
}