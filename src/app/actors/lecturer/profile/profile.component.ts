import { MatDialog } from '@angular/material';
import { FileviewerComponent } from '../../../components/dialog/fileviewer/fileviewer.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Lecturer } from 'src/app/model/lecturer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class LecturerProfileComponent implements OnInit {

  user: Lecturer;
  error: string;
  isLoading: boolean = true;

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private dialog: MatDialog) { }

  async ngOnInit() {
    try{
      let response = await this.userService.getProfile(this.authService.loggedInUser().position);
      
      this.isLoading = false;

      if(!response.success) this.error = response.message;
      else {
        this.user = response.data;
      }
    }
    catch(e){
      console.log(e);
      this.error = e.message;
      this.isLoading = false;
    }
  
  }

  openViewer(files: { url: string, docName: string}): void{
    const dialogRef = this.dialog.open(FileviewerComponent, {
      width: '80%',
      data: { url: files.url, title:  files.docName }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed")
    })
  }
}