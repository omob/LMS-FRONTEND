import { ServerResponse } from './../model/serverResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected URL ="http://127.0.0.1:3000";

  constructor( protected http: HttpClient) { 
  }

  async get(url:string){
    return this.http.get(this.URL + url).toPromise();
  }

  async getRoles() : Promise<ServerResponse>{
    return await this.get('/api/roles');
  } 
  

}
