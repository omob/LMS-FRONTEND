import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServerResponse } from '../model/serverResponse';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends DataService {

  constructor(protected http: HttpClient, private auth: AuthService) {
    super(http);
  }


  async getAllCourses(): Promise<ServerResponse> {
    // gets all list of courses under a student's programme
    const programmeId = this.auth.loggedInUser().programmeId;

    return this.http.get(this.URL + '/api/courses', {
      headers: { 'Authorization': this.auth.getToken() },
      params: {programmeId: programmeId }
    }).toPromise();

  }

  getCourses(role: string, query?): Promise<ServerResponse> {
    // console.log("get role", this.auth.loggedInUser().position);

    return this.http.get( this.getUrl(role), {
      headers: { 'Authorization': this.auth.getToken() },
      params: { query: query }
    }).toPromise();
  }

  async getCourse(courseId, role, query?: { session: string, semester: string } ): Promise<ServerResponse> {
    return this.http.get(this.getUrl(role) + `/${courseId}`, {
      headers: { 'Authorization': this.auth.getToken() },
      params: query
    }).toPromise();
  }

  async add(courses): Promise<ServerResponse> {
    return this.http.post(this.URL + '/api/student/courses', courses, this.auth.getHeaders()).toPromise();
  }


  async update( courseId: string, role: string, params: object, category): Promise<ServerResponse> {
    console.log(params);
    return this.http.put(this.getUrl(role) + `/${courseId}`, params, {
              headers: { 'Authorization': this.auth.getToken() },
              params: { category: category }
            }).toPromise();
  }

  async uploadCourseMaterial(courseId: string, role: string, formData: FormData ): Promise<ServerResponse> {
    console.log(formData);
    return this.http.put(this.getUrl(role) +  `/uploads/${courseId}`, formData, {
              headers: { 'Authorization': this.auth.getToken() }
            }).toPromise();
  }

  private getUrl(role: string): string {
    let url: string;

    switch (role) {
      case 'student': url = '/api/student/courses';
        break;
      case 'lecturer': url = '/api/lecturer/courses';
        break;
      case 'admin' : url = '/api/admin/courses';
        break;
      default: url = '/api/student/courses';
        break;
    }

    return this.URL + url;
  }

  getSessions() {
    return [
      '2019/2020',
      '2018/2019',
      '2017/2018',
      '2016/2017',
      '2015/2016',
      '2014/2015',
      '2013/2014'
    ];
  }

  getSemesters() {
    return [ 'first', 'second'];
  }



}
