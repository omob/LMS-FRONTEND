import { Router } from '@angular/router';
import { Course } from './../../../model/course';
import { CourseService } from './../../../services/course.service';
import { Component, OnInit, InjectionToken } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteDefaultOptions, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-course-register',
  templateUrl: './course-register.component.html',
  styleUrls: ['./course-register.component.css']
})

export class CourseRegisterComponent implements OnInit {
  searchCourseFormField: FormControl;

  coursesList: Course[] = [];

  filteredOptions: Observable<Course[]>;
  course: any;
  sessions: any[] = [];

  coursesTableData: any[] = [];
  displayedColumns: any[] = [];
  dataSource: MatTableDataSource<Course[]>;

  constructor(private courseService: CourseService, private router: Router) {
    this.searchCourseFormField = new FormControl('', Validators.required);

    this.course = { session: '', semester: '' };
    this.sessions = this.courseService.getSessions();
    this.displayedColumns = [ 'sn', 'courseCode', 'courseName', 'lecturer', 'unit', 'options'];

  }

  async ngOnInit() {
    const result  = await this.courseService.getAllCourses();
    this.coursesList = result.data;

    if (this.coursesList) {
      this.filteredOptions = this.searchCourseFormField.valueChanges
        .pipe(
          startWith<string | Course>(''),
          map(value => typeof value === 'string' ? value : value.courseName),
          map(name => name ? this._filter(name) : this.coursesList.slice()
          ));
    }
  }

  displayFn(courseN?: Course): string | undefined {
    return courseN ? courseN.courseName : undefined;
  }

  private _filter(name: string): Course[] {
    const filterValue = name.toLowerCase();

    return this.coursesList.filter(option => (option.courseCode.toLowerCase()).indexOf(filterValue) === 0);
  }

  private resetFormControl() {
    this.searchCourseFormField.setValue('');
    this.searchCourseFormField.setErrors(null);
  }

  addCourse() {
    if (typeof this.searchCourseFormField.value !== 'object') { return; }

    // check is the course already exist in the array
    if (this.coursesTableData.findIndex(x => x.courseCode == this.searchCourseFormField.value.courseCode) != -1) { return; }

    console.log(this.searchCourseFormField.value);

     const extract =  this.extractDataFromCourseList(this.searchCourseFormField.value);
    // add the course
    this.coursesTableData.splice(0, 0, extract);
    this.resetFormControl();

    this.dataSource = new MatTableDataSource(this.coursesTableData);
  }

  private extractDataFromCourseList(course) {
      console.log(course.session);
      const fields = course.session.find(c => c.sessionName == this.course.session);
      return { ...course, ...fields };
 }

  removeCourse(course: Course) {
    const courseIndex = this.coursesTableData.indexOf(course);
    this.coursesTableData.splice(courseIndex, 1);

    this.dataSource = new MatTableDataSource(this.coursesTableData);
  }

  async submitCourse() {

    const formData = {
      'session': this.course.session,
      'semester': {
        'name': this.course.semester,
        'courses': this.getCoursesId()
      }
    };

    try {
      const result = await this.courseService.add(formData);
      if (result.success) { this.router.navigateByUrl('student/courses'); }

    } catch (e) {
      console.log(e);
    }

  }

  private getCoursesId() {
    const coursesId: any[] = this.coursesTableData.map(course => course._id);
    return coursesId;
  }

  goBack(): void {
    this.router.navigateByUrl('/student/courses');
  }
}

