import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Course } from './../../../model/course';
import { CourseService } from './../../../services/course.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class LecturerCoursesComponent implements OnInit {
 
  coursesList: any;
  coursesTable: any[] = [];
  displayedColumns: any[];
  _session: string; // for session select input
  _semester: string; //for semester select inpput
  message: string;
  error: string;
  sessionsArray: Session[];
  isLoading: boolean = true;
  sessionsList: String[]; //array holding list of sessions registered by student
  semestersList: String[];  //array holding list of semesters done in that session
  dataSource: MatTableDataSource<any[]>;


  constructor(
    private courseService: CourseService, 
    private auth: AuthService, 
    private router: Router) {
      this.sessionsList = [ "2018/2019", "2019/2020"];
      this.semestersList = ["first", "second"];
  }

  async ngOnInit() {
    this.removeSessionInfoFromLocalStorage();
  
    try {
      let result = await this.courseService.getCourses(this.auth.loggedInUser().position);
      this.isLoading = false;
      if(!result.success) {
        this.error = result.message;
        console.log(result.message)
        return;
      }

      this.coursesList = result.data;
      let courseObj = [];

      this.coursesList.forEach(element => {
        element.session.forEach(x => {
          courseObj.push({...element, sessionName: x.sessionName, semester: x.semester})
        })
      });

      //populate data table
      //let show all courses first
      this.coursesTable = this.coursesList = courseObj;
      this.dataSource = new MatTableDataSource(this.coursesTable);

      this.displayedColumns= [ 'sn', 'courseCode', 'courseName', 'session', 'semester', 'units'];
    }
    catch(e){
      this.error = e.message;
    }
  }

  private filtertable( course: Course2[]): void {
    let result = course.filter( x => (x.sessionName == this._session) && (x.semester.toLowerCase() == this._semester))

    if(result) {
      this.coursesTable = result;
      this.dataSource = new MatTableDataSource(result as any)
    }
    else {
      this.coursesTable = [];
      this.dataSource = new MatTableDataSource([]);
    }
  }

  public onSelectChange($event) : void{
    this.filtertable(this.coursesList);
  }

  public onClick($event) : void{
    //do your thing
  }

  public gotToCourseDetail(course):void{
    this.addSessionInfoToLocalStorage(course);
    this.router.navigate(['/lecturer/courses', course._id]);
  }

  private addSessionInfoToLocalStorage(course){
    //add session and semester to 
    let currentSession = this._session || course.sessionName;
    let currentSemester = this._semester || course.semester

    localStorage.setItem('sessionInfo', JSON.stringify({
      session: currentSession,
      semester: currentSemester 
    }));
  }

  private removeSessionInfoFromLocalStorage(){
    let sessionInfo = localStorage.getItem("sessionInfo");
    if(sessionInfo) localStorage.removeItem("sessionInfo");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

interface Session{
  semester: Semester;
  sessionName: string;
}

interface Semester{
  courses: Course[];
  semesterType: string;
}

interface Course2{
  courseCode: string;
  courseName: string;
  lecturer: object;
  unit: string;
  sessionName: string;
  semester: string;
  syllabus: Array<object>;
  programme: object;
}