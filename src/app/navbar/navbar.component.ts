import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'dee-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appName: string = "DOE ERP";

  constructor(private authService: AuthService) {  
  }

  ngOnInit() {
  }


}