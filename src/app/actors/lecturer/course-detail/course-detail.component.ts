import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/model/course';
import { FileviewerComponent } from '../../../components/dialog/fileviewer/fileviewer.component';
import { AssignmentSheetComponent } from './../../../components/sheets/assignment-sheet/assignment-sheet.component';
import { DialogData } from './../../../model/dialogData';
import { AuthService } from './../../../services/auth.service';
import { CourseService } from './../../../services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class LecturerCourseDetailComponent implements OnInit {

  course: Course;
  message: string;
  error: string;
  session: string;
  semester: string;
  courseOutline: Object[];
  totalStudents: string;
  courseId: string;
  // test: string;
  isLoading: boolean = true;


  displayedColumns: any[];
  dataSource: MatTableDataSource<any[]>;
  registeredStudents: any[];

  constructor(
    private courseService: CourseService, 
    private route: ActivatedRoute, 
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet) { }

  async ngOnInit() {

    this.courseId = this.route.snapshot.paramMap.get("id");
    
    //fetch session and semester from localstorage
    let sessionInfo = JSON.parse(localStorage.getItem('sessionInfo'));

    //there must be a sessionInfo in localstorage before you can view information about a course
    if(!sessionInfo) {
      this.router.navigateByUrl('/lecturer/courses');
      return;
    }

    this.session = sessionInfo.session;
    this.semester = sessionInfo.semester;

    try{
      let result = await this.courseService.getCourse(this.courseId, this.auth.loggedInUser().position, { session: this.session, semester: this.semester });
      this.isLoading = false;
      if(!result.success){
        this.message = result.message;
        console.log(result.message);
        return;
      }
      
      this.course = this.extractDataFromCourseList(result.data);
      this.totalStudents = result["students"]; //this is a temporaray hack as i'm currently unable to add the student property to the data key

      console.log(this.course);

      //for table 
      
      this.displayedColumns= [ 'sn', 'fullname', 'matricNo', 'assignments', 'attendance', 'tests', 'exams', 'grade', 'info'];
      this.registeredStudents = [
        { sn: '1', fullname: 'Ezekiel Smith', matricNo: '1019181956', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null },
        { sn: '1', fullname: 'Jenah Smith', matricNo: '1019181957', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null },
        { sn: '1', fullname: 'Charles Kenedi', matricNo: '1019181958', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null },
        { sn: '1', fullname: 'Willaims James', matricNo: '1019181959', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null },
        { sn: '1', fullname: 'Rachael Cathy', matricNo: '1019181960', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null },
        { sn: '1', fullname: 'Philip Monss', matricNo: '1019181961', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null },
        { sn: '2', fullname: 'Jeremiah Wills', matricNo: '1019181962', assignment: '20', attendance: '10', tests: 25, exams: 30, grade: null },
        { sn: '3', fullname: 'Riah Klint', matricNo: '1019181963', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null },
        { sn: '4', fullname: 'Zeruban Stout', matricNo: '1019181964', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null },
        { sn: '5', fullname: 'Jonathan Richy Stout', matricNo: '1019181965', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null },
        { sn: '6', fullname: 'Isaih Williams Stout', matricNo: '1019181966', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null },
        { sn: '7', fullname: 'Ademakin Debby', matricNo: '1019181967', assignment: '10', attendance: '10', tests: 20, exams: 40, grade: null }
      ];

      this.dataSource = new MatTableDataSource(this.registeredStudents)

    }
    catch(e){
      console.log(e);
      this.error = e.message;
    }
  }


  private extractDataFromCourseList(course): Course {
    let fields = course.session.find(c => c.sessionName == this.session);
    return { ...course, ...fields }
  }

  openViewer(files: DialogData): void{
    const dialogRef = this.dialog.open(FileviewerComponent, {
      width: '80%',
      data: { url: files.file, title:  files.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed")
    })
  }

  editCourse(): void{
    this.router.navigate(['/lecturer/courses/edit/', this.courseId]);
  }

  goBack() : void{
    this.router.navigateByUrl('/lecturer/courses');
  }

  openBottomSheet(assignment): void {
    //fetch detail from server
    this.bottomSheet.open(AssignmentSheetComponent, {
      data: { assignments: ['Frodo', 'Bilbo'] },
    });
  }

  applyTableFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


