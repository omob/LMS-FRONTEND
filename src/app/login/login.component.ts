import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  isChecked = true;
  userdetail: any;
  roles:any;
  message: {error?: string; message?: string} = {};
  subscription: Subscription;
  isDisabled = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private data: DataService) {}

  async ngOnInit() {
    try{
      let result  = await this.data.getRoles();

      let roles = Object.keys(result.data[0]);
      // console.log(roles)

      this.roles = roles.slice(1, 3);
      console.log(this.roles)
    }
    catch(e){

    }
  }


  onSubmit(form){
    //submit the form 
    this.isDisabled= true;
    this.subscription = this.authService.login(form)
      .subscribe(result => {
        this.authService.isLoggedIn();
        if(result.success) {
          let user = this.authService.loggedInUser();

          switch (user.position) {
            case 'student':
              this.router.navigateByUrl('/student/dashboard');
              break;
   
           case 'lecturer':
              this.router.navigateByUrl('/lecturer/dashboard');
              break;

            default: {
              console.log("No matched position");
              this.message.error = "Could not redirect at this time";
              break;
            }
          }
        }
        else {
          if(!result.success) {
            if(!result.message) this.message.error = "Could not login at this time";
            else{
              console.log(this.message)
              this.message.message = result.message;
              this.isDisabled = false;
            }
          }
        }
      })
  }

  onDestroy(){
    this.subscription.unsubscribe();
  }

  async getRoles(){

  }

}
