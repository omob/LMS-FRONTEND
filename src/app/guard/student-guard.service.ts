import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(){
    //if position is not equal 
    let user = this.authService.loggedInUser();

    if(user.position == "student" || user.position == "admin") return true;

    switch (user.position) {
      case 'lecturer':
          this.router.navigateByUrl('/lecturer/dashboard');
        break;
      default: 
          this.authService.logout();
          this.router.navigateByUrl('/login');
        break;
    }

    return false;
  } 
}
