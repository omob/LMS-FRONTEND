import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalysisComponent } from '../../actors/lecturer/analysis/analysis.component';
import { LecturerAssignmentComponent } from '../../actors/lecturer/assignment/assignment.component';
import { AttendanceComponent } from '../../actors/lecturer/attendance/attendance.component';
import { LecturerCourseDetailComponent } from '../../actors/lecturer/course-detail/course-detail.component';
import { LecturerCoursesComponent } from '../../actors/lecturer/courses/courses.component';
import { LecturerDashboardComponent } from '../../actors/lecturer/dashboard/dashboard.component';
import { LecturerEditCourseDetailComponent } from '../../actors/lecturer/edit-course-detail/edit-course-detail.component';
import { LecturerEditProfileComponent } from '../../actors/lecturer/edit-profile/edit-profile.component';
import { LecturerHomeComponent } from '../../actors/lecturer/home/home.component';
import { LecturerProfileComponent } from '../../actors/lecturer/profile/profile.component';
import { ResultComponent } from '../../actors/lecturer/result/result.component';
import { CourseDetailComponent } from '../../actors/student/course-detail/course-detail.component';
import { CourseRegisterComponent } from '../../actors/student/course-register/course-register.component';
import { CoursesComponent } from '../../actors/student/courses/courses.component';
import { StudentDashboardComponent } from '../../actors/student/dashboard/dashboard.component';
import { EditprofileComponent } from '../../actors/student/editprofile/editprofile.component';
import { StudentHomeComponent } from '../../actors/student/home/home.component';
import { StudentProfileComponent } from '../../actors/student/profile/profile.component';
import { RegisterComponent } from '../../actors/student/register/register.component';
import { HelpComponent } from '../../components/help/help.component';
import { MessageComponent } from '../../components/message/message.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { AuthGuard } from '../../guard/auth-guard.service';
import { LecturerGuardService } from '../../guard/lecturer-guard.service';
import { StudentGuardService } from '../../guard/student-guard.service';
import { LoginComponent } from '../../login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { 
    path: 'student', 
    component: StudentDashboardComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: StudentHomeComponent, canActivate: [AuthGuard, StudentGuardService]},
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard, StudentGuardService] },
      { path: 'courses/:id', component: CourseDetailComponent, canActivate: [AuthGuard, StudentGuardService] },
      { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard, StudentGuardService] },
      { path: 'courses-register', component: CourseRegisterComponent, canActivate: [AuthGuard, StudentGuardService] },
      { path: 'profile/edit', component: EditprofileComponent, canActivate: [AuthGuard, StudentGuardService] },
      { path: 'profile', component: StudentProfileComponent, canActivate: [AuthGuard, StudentGuardService]},
      { path: 'help', component: HelpComponent },
      { path: 'messages', component: MessageComponent },
      { path: '**', component: StudentHomeComponent, canActivate: [AuthGuard, StudentGuardService]},
    ]
  },
  { 
    path: 'lecturer', 
    component: LecturerDashboardComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: LecturerHomeComponent, canActivate: [AuthGuard, LecturerGuardService]},
      { path: 'courses/:id', component: LecturerCourseDetailComponent, canActivate: [AuthGuard, LecturerGuardService] },
      { path: 'courses/edit/:id', component: LecturerEditCourseDetailComponent, canActivate: [AuthGuard, LecturerGuardService] },
      { path: 'courses', component: LecturerCoursesComponent, canActivate: [AuthGuard, LecturerGuardService] },

      { path: 'assignment', component: LecturerAssignmentComponent, canActivate: [AuthGuard, LecturerGuardService] },
      { path: 'profile/edit', component: LecturerEditProfileComponent, canActivate: [AuthGuard, LecturerGuardService] },
      { path: 'profile', component: LecturerProfileComponent, canActivate: [AuthGuard, LecturerGuardService]},
      { path: 'result', component: ResultComponent, canActivate: [AuthGuard, LecturerGuardService]},
      { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard, LecturerGuardService]},
      { path: 'analysis', component: AnalysisComponent, canActivate: [AuthGuard, LecturerGuardService]},
      { path: 'help', component: HelpComponent },
      { path: 'messages', component: MessageComponent },

      { path: '**', component: LecturerHomeComponent, canActivate: [AuthGuard, LecturerGuardService]}
    ]
  },
  { path: '**', component: NotFoundComponent},

]

@NgModule({
  declarations: [],
  imports: [
  CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
