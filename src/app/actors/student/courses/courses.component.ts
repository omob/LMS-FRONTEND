import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  course: any;
  coursesTable: any[] = [];
  displayedColumns: any[];
  _session: string; // for session select input
  _semester: string; // for semester select inpput
  message: string;
  error: string;
  sessionsArray: Session[];
  isLoading = true;
  sessionsList: String[]; // array holding list of sessions registered by student
  semestersList: String[]; // array holding list of semesters done in that session

  constructor(private courseService: CourseService, private auth: AuthService) {

  }

  async ngOnInit() {

    try {
      const result = await this.courseService.getCourses(this.auth.loggedInUser().position);
      this.isLoading = false;
      if (!result.success) {
        this.error = result.message;
        console.log(result.message);
        return;
      }

      // console.log(result.data)
      this.sessionsArray = result.data.sessions;
      // console.log(this.sessionsArray);

      this.sessionsList = this.getSessions(this.sessionsArray); // gets list of sessions by student
     console.log(this.sessionsList);
      const __session = this.getLatestSession(this.sessionsArray); // gets the current session i.e latest session: Session[]

      this._session = __session.year; // gets the current session i.e last element in the array (year)

      this.semestersList = this.getSemesters(__session.semesters);
      const semesterArray = this.getLatestSemester(this.getLatestSession(this.sessionsArray).semesters); //gets current semester
      this._semester = semesterArray.semesterType;
      console.log('Semester Array', semesterArray);

      this.coursesTable =  this.extractDataFromCourse(semesterArray.courses);
      // this.extractDataFromCourse(semesterArray.courses);
      this.displayedColumns = [ 'sn', 'courseCode', 'courseName', 'lecturer', 'result'];

    } catch (e) {
      this.error = e.message;
    }
  }

  private extractDataFromCourse(courses) {
    // extracts the session array from within the course by checking where the session in the course array
    // is equal to the current session
    // returns the session info and joins it on the same level as in line 70
    const coursesArray = [];
    console.log('Before ExtractDataFromCourses', courses);

    for (let i = 0; i < courses.length; i++) {
      for (let j = 0; j < courses[i].course.session.length; j++) {
        if (courses[i].course.session[j].sessionName === this._session) {
          coursesArray.push({...courses[i], ...courses[i].course.session[j]});
        }
      }
    }

    console.log('ExtractDataFromCourses', coursesArray);
     return coursesArray;
  }

  private getLatestCourse(data) {

  }

  private getCourses(session?: string, semester?: string) {
    // check inside the session for the semester

    const _session = this.getSession(this.sessionsArray);
    this.semestersList = this.getSemesters(_session.semesters);

    const _semester = this.getSemester(_session.semesters);

    console.log(_semester.courses);
    return _semester ? this.extractDataFromCourse(_semester.courses) : [];
  }

  public onSelectChange() {
    console.log(this._semester, ' ', this._session);
    this.coursesTable = this.getCourses();

  }



  // collates a list of sessions a students has done
  public getSessions(sessions: Session[]) {
    return sessions.map(session => session.sessionName);
  }

  // get list of semesters under a session
  public getSemesters(semesters: Semester[]) {
    return semesters.map(semester => semester.semesterType);
  }

// private functions for computing the session and semester
  private getSession(sessions: Session[]) {
    return sessions.find(session => session.sessionName == this._session);
  }

  private getSemester(semesters: Semester[]): Semester | undefined {
    return semesters.find(sem => sem.semesterType.toLowerCase().trim() === this._semester.toLowerCase().trim());
  }

  private getLatestSession(sessions: Session[]) {

    const _session = sessions[sessions.length - 1];
    return {
      year: _session.sessionName,
      semesters: _session.semesters
    };
  }

  private getLatestSemester(semesters: Semester[]) {
    return semesters[semesters.length - 1];
  }

  public onClick(event) {
    console.log(event);
  }

  viewAll() {
    console.log('here');
  }
}

interface Session {
  semesters: Semester[];
  sessionName: string;
}

interface Semester {
  courses: Course[];
  semesterType: string;
}
