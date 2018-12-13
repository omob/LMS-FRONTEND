import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isChecked = true;

  roles:any;

  constructor() { 
    this.roles = [
      { name: "Student", id: 1},
      { name: "Lecturer", id: 2}
    ]
  }

  ngOnInit() {
  }

  onChange(event){
    console.log(event)
  }

  onSubmit(form){
    console.log(form)
  }

}
