import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FileviewerComponent } from '../../../components/dialog/fileviewer/fileviewer.component';
import { CourseService } from './../../../services/course.service';
import { extractDataFromCourse } from './../../../utilities/functions';
import { DeleteComponent as DeleteDialogComponent } from '../../../components/dialog/delete/delete.component';
import { Subscription } from 'rxjs';
import { SnackBarComponent } from '../../../components/dialog/snack-bar/snack-bar.component';

@Component({
  selector: 'app-edit-course-detail',
  templateUrl: './edit-course-detail.component.html',
  styleUrls: ['./edit-course-detail.component.css']
})
export class LecturerEditCourseDetailComponent implements OnInit {

  course: Course2;
  message: string;
  error: string;
  session: string;
  semester: string;
  courseOutline: Object[];
  totalStudents: string;
  courseId: string;
  courseOutlineField: any[];
  courseOutlineTest: any;
  isLoading: boolean = true;
  subscription:  Subscription;
  courseGroup: FormGroup;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {

      this.courseGroup = fb.group({
        courseOutline: fb.group({
          week: ['', Validators.required],
          outlines: fb.array([])
        }),
        courseMaterial: fb.group({
          title: ['', Validators.required],
          body: [],
          file: []
        }),
        courseAssignment: fb.group({
          id: [''],
          question: ['', Validators.required],
          dueDate: [''],
          createdDate: [ new Date().toDateString() ]
        })
      })
    }

  async ngOnInit() {

    this.courseId = this.route.snapshot.paramMap.get("id");
    let sessionInfo = JSON.parse(localStorage.getItem('sessionInfo'));
    if(!sessionInfo) {
      this.router.navigateByUrl('/lecturer/courses');
      return;
    }
    this.session = sessionInfo.session;
    this.semester = sessionInfo.semester;

    try{
      let result = await this.courseService.getCourse(
        this.courseId,
        this.auth.loggedInUser().position,
        { session: this.session, semester: this.semester });

      if(!result.success){
        console.log(result)
        this.message = result.message;
        console.log(result.message);
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
      this.populateContent(result);
    }
    catch(e){
      console.log(e);
      this.isLoading = false;
      this.error = e.message;
    }
  }

  private populateContent(result){
    let localCourse = Object.assign({}, result.data);
    this.course =  extractDataFromCourse(localCourse, this.session, this.semester);

    //extract the current session and semester from the
    this.totalStudents = result["students"]; //this is a temporaray hack as i'm currently unable to add the student property to the data key
  }

  goBack(): void{
    this.router.navigateByUrl(`/lecturer/courses/${this.courseId}`);
  }

  addOutline( $event: Event, outline: HTMLInputElement) : void{
    this.topics.push( new FormControl({
      topic: outline.value
    }));

    outline.value = '';
  }

  removeOutline( outline: FormControl) : void{
    console.log("I am called too")
    let index = this.topics.controls.indexOf(outline);
    this.topics.removeAt(index);
  }

  get topics(){
    return (this.courseGroup.get('courseOutline.outlines') as FormArray);
  }

  addToTable() : void{
    //append to the course property
    let value = Object.assign({}, this.courseGroup.value.courseOutline);
    this.course.courseOutline.push({...value});
    //reset
    this.topics.controls = [];
    this.courseGroup.get('courseOutline.outlines').reset();
    this.courseGroup.get('courseOutline.week').reset();
  }

  removeFromTable(outline){
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    this.subscription = dialogRef.afterClosed().subscribe(result => {
      if(result){
        let index = this.course.courseOutline.indexOf(outline);
        (this.course.courseOutline as any[]).splice(index, 1);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.course.courseOutline, event.previousIndex, event.currentIndex);
  }

  async updateCourseOutline(button: HTMLElement){
    button["disabled"] = true;

    let response = await this.courseService.update(
      this.courseId,
      this.auth.loggedInUser().position,
      { outlines: this.course.courseOutline, session: this.session, semester: this.semester},
      "courseOutline"
      );

    this.snackBar.openFromComponent(SnackBarComponent,{
      data:  (response.success ? 'updated!' : 'could not update'),
      verticalPosition: 'top'
    });

    button["disabled"] = false;
  }

  async addCourseMaterial() : Promise<void>{
    let cMaterialForm = this.courseMaterial.value;

    const formData = new FormData();
    if(cMaterialForm.file) formData.append('courseMaterial', cMaterialForm.file, cMaterialForm.file.name);

    formData.append('title', cMaterialForm.title);
    formData.append('body', cMaterialForm.body);
    formData.append('session', this.session);
    formData.append('semester', this.semester);

    try{
      let response = await this.courseService.uploadCourseMaterial(this.courseId, this.auth.loggedInUser().position, formData)
      console.log(response);

      this.snackBar.openFromComponent(SnackBarComponent,{
        data:  (response.success ? 'Added!' : 'Could not add'),
        verticalPosition: 'top'
      });

      if(response.success){
        this.courseGroup.get('courseMaterial').reset();
        this.populateContent(response)
      }
    }
    catch(e){
      console.log(e)
    }
  }

  onFileChange(event){
    let file = <File>event.target.files[0];
    if(file) this.courseMaterial.patchValue({file: file});
  }

  get courseMaterial() : AbstractControl{
    return this.courseGroup.get('courseMaterial');
  }


  private removeCourseMaterialDialog(material): void{
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    this.subscription = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.removeCourseMaterial(material);
      }
    });
  }

  async removeCourseMaterial(material): Promise<void>{
    let response = await this.courseService.update(this.courseId, this.auth.loggedInUser().position, {
      session: this.session,
      semester: this.semester,
      material
    }, "courseMaterial");

    this.snackBar.openFromComponent(SnackBarComponent,{
      data:  (response.success ? 'Deleted!' : 'could not delete'),
      verticalPosition: 'top'
    });

    if(response.success) {
      this.populateContent(response);
    }

  }

  openViewer(files: { file: string, title: string}): void{
    const dialogRef = this.dialog.open(FileviewerComponent, {
      width: '80%',
      data: { url: files.file, title:  files.title }
    });
  }

  ngOnDestroy(): void{
    if(this.subscription) this.subscription.unsubscribe();

    console.log("Destroyed")
  }

  async updateAssignments(callback?): Promise<void>{
    //updates the assignments
    // console.log(this.course.assignment);
    try{
      let response = await this.courseService.update(this.courseId, this.auth.loggedInUser().position, {
        assignments: this.course.assignment,
        session: this.session,
        semester: this.semester
      }, "assignments");

      this.snackBar.openFromComponent(SnackBarComponent,{
        data:  (response.success ? 'Success updating assignments!' : 'Error updating assignments'),
        verticalPosition: 'top'
      });

      if(response.success) {
        this.courseGroup.get('courseAssignment').reset();
        this.populateContent(response);
      }
      else callback("err");

    }catch(e){
      this.snackBar.openFromComponent(SnackBarComponent,{
        data:  'Error completing the operation at the moment',
        verticalPosition: 'top'
      });

      callback(e);
    }

  }

  async addAssignment(): Promise<void>{ //saves assignments
    let formData = this.courseGroup.get('courseAssignment').value;
    formData.id = new Date().getTime();

    try{
      let response = await this.courseService.update(this.courseId, this.auth.loggedInUser().position, {
        assignment: formData,
        session: this.session,
        semester: this.semester
      }, "assignment");

      this.snackBar.openFromComponent(SnackBarComponent,{
        data:  (response.success ? 'Success posting assignment!' : 'Error posting assignment'),
        verticalPosition: 'top'
      });

      if(response.success) {
        this.courseGroup.get('courseAssignment').reset();
        this.populateContent(response);
      }
    }catch(e){
      this.snackBar.openFromComponent(SnackBarComponent,{
        data: "Error adding assignment at the moment",
        verticalPosition: 'top'
      });
      console.log(e);
    }
  }

  deleteAssignment(assignment): void{
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    this.subscription = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let index = this.course.assignment.indexOf(assignment);
        let delItem = this.course.assignment.splice(index, 1);

        //update
        this.updateAssignments((err)=>{
          if(err){
            (delItem.length > 0)? this.course.assignment.splice(index, 0, delItem[0]): null;
          }
        });
      }
    });
  }
}

interface Course2{
    sessionName: string;
    lecturer: object;
    courseMaterial: any;
    courseOutline: any;
    semester: string;
    courseCode: string;
    courseName: string;
    units: string;
    programme: object;
    assignment?: any[];
}
