import { DialogData } from './../../../model/dialogData';
import { FileviewerComponent } from '../../../components/dialog/fileviewer/fileviewer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from './../../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course';
import { MatDialog } from '@angular/material';
// import { extractDataFromCourseList } from 'src/app/utilities/functions'
import { AuthService } from './../../../services/auth.service';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course;
  message: string;
  error: string;
  session: string;
  semester: string;
  courseOutline: Object[];
  expanded = false;
  isLoading = true;


  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthService) { }

  async ngOnInit() {

    const courseId = this.route.snapshot.paramMap.get('id');
    this.session = this.route.snapshot.queryParamMap.get('session');
    this.semester = this.route.snapshot.queryParamMap.get('semester');

    try {
      const result = await this.courseService.getCourse(courseId, this.auth.loggedInUser().position);

      if (!result.success) {
        this.error = result.message;
        console.log(result.message);
        return;
      }

      this.isLoading = false;

      this.course = this.extractDataFromCourseList(result.data);
      console.log(this.course);
    } catch (e) {
      console.log(e);
      this.error = e.message;
      this.isLoading = false;
    }
  }


  private extractDataFromCourseList(course): Course {
    const fields = course.session.find(c => c.sessionName == this.session);
    return { ...course, ...fields };
  }

  openViewer(files: DialogData): void {
    const dialogRef = this.dialog.open(FileviewerComponent, {
      width: '80%',
      data: { url: files.file, title:  files.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/student/courses');
  }


  getTimeDifference(createdDate, dueDate) {
    const result = new Date(dueDate).getTime() - new Date(createdDate).getTime();
    return result;
  }

  isExpired(dueDate: string) {
    const dateNow = new Date().getTime();
    const dueDateN = new Date(dueDate).getTime();

    const differnceInHour = (dueDateN - dateNow) / (1000 * 60 * 60);
    if (differnceInHour < 0) { return true; }


  }
}


