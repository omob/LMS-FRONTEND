import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServerResponse } from '../model/serverResponse';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})


export class UserService extends DataService {

  constructor(protected http: HttpClient, private auth: AuthService) {
    super(http);
  }

   async getProfile(role: string): Promise<ServerResponse> {
      return this.http.get(this.getUrl(role) + '/profile', this.auth.getHeaders()).toPromise();
   }

   async get(url) {
    return this.http.get(this.URL + url).toPromise();
  }

  async updateProfile(role: string, user): Promise<ServerResponse> {
    return this.http.put(this.getUrl(role) + '/profile', user, this.auth.getHeaders()).toPromise();
  }

  async uploadDoc(role: string, formData: FormData): Promise<ServerResponse> {
    return this.http.post(this.getUrl(role) + '/profile/uploads', formData, {
      headers: { 'Authorization': this.auth.getToken() }
    }).toPromise();
  }

  async removeDoc(role: string, doc): Promise<ServerResponse> {
    return this.http.delete(this.getUrl(role) + '/profile/uploads', {
      headers: {
        'Authorization': this.auth.getToken()
      },
      params: {
        document: JSON.stringify(doc)
      }
    }).toPromise();
  }


  private getUrl(role: string): String {
    let url: string;
    url = (role.toLowerCase() === 'student') ? '/api/student' : '/api/staff';

    return this.URL + url;
  }

  // getNationalities(){
  //   return this.get('/api/nationalities');
  // }
}
