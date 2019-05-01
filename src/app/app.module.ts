import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AnalysisComponent } from './actors/lecturer/analysis/analysis.component';
import { LecturerAssignmentComponent } from './actors/lecturer/assignment/assignment.component';
import { AttendanceComponent } from './actors/lecturer/attendance/attendance.component';
import { LecturerCourseDetailComponent } from './actors/lecturer/course-detail/course-detail.component';
import { LecturerCoursesComponent } from './actors/lecturer/courses/courses.component';
import { LecturerDashboardComponent } from './actors/lecturer/dashboard/dashboard.component';
import { LecturerEditCourseDetailComponent } from './actors/lecturer/edit-course-detail/edit-course-detail.component';
import { LecturerEditProfileComponent } from './actors/lecturer/edit-profile/edit-profile.component';
import { LecturerHomeComponent } from './actors/lecturer/home/home.component';
import { LecturerProfileComponent } from './actors/lecturer/profile/profile.component';
import { ResultComponent } from './actors/lecturer/result/result.component';
import { CourseDetailComponent } from './actors/student/course-detail/course-detail.component';
import { CourseRegisterComponent } from './actors/student/course-register/course-register.component';
import { CoursesComponent } from './actors/student/courses/courses.component';
import { StudentDashboardComponent } from './actors/student/dashboard/dashboard.component';
import { EditprofileComponent } from './actors/student/editprofile/editprofile.component';
import { StudentHomeComponent } from './actors/student/home/home.component';
import { StudentProfileComponent } from './actors/student/profile/profile.component';
import { RegisterComponent } from './actors/student/register/register.component';
import { AppComponent } from './app.component';
import { DeleteComponent } from './components/dialog/delete/delete.component';
import { FileviewerComponent } from './components/dialog/fileviewer/fileviewer.component';
import { NewsDialogComponent } from './components/dialog/news/news.component';
import { SnackBarComponent } from './components/dialog/snack-bar/snack-bar.component';
import { HelpComponent } from './components/help/help.component';
import { MessageComponent } from './components/message/message.component';
import { NewsComponent } from './components/news/news.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReportComponent } from './components/report/report.component';
import { AssignmentSheetComponent } from './components/sheets/assignment-sheet/assignment-sheet.component';
import { AuthGuard } from './guard/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { MatComponentModule } from './modules/mat-component/mat-component.module';
import { RoutingModule } from './modules/routing/routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { CourseService } from './services/course.service';
import { UserService } from './services/user.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentDashboardComponent,
    RegisterComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    StudentProfileComponent,
    EditprofileComponent,
    StudentHomeComponent,
    CoursesComponent,
    CourseRegisterComponent,
    CourseDetailComponent,
    FileviewerComponent,
    LecturerHomeComponent,
    LecturerDashboardComponent,
    LecturerEditCourseDetailComponent,
    LecturerProfileComponent,
    LecturerEditProfileComponent,
    LecturerAssignmentComponent,
    LecturerCourseDetailComponent,
    LecturerCoursesComponent,
    ResultComponent,
    AnalysisComponent,
    AttendanceComponent,
    DeleteComponent,
    SnackBarComponent,
    AssignmentSheetComponent,
    ReportComponent,
    HelpComponent,
    MessageComponent,
    NewsComponent,
    NewsDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RoutingModule,
    MatComponentModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,
    PdfViewerModule,
    ReactiveFormsModule,
    ChartsModule,
    DragDropModule,

  ],
  entryComponents: [
    FileviewerComponent,
    DeleteComponent,
    SnackBarComponent,
    AssignmentSheetComponent,
    NewsDialogComponent
  ],
  providers: [ UserService, AuthService, AuthGuard, CourseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }


