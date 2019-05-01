import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private route: Router, private activatedRoute: ActivatedRoute){
    // let token = localStorage.getItem('token');

    // if(!token) route.navigateByUrl('login');
  }

}
