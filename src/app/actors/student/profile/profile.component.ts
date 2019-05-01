import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FileviewerComponent } from '../../../components/dialog/fileviewer/fileviewer.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  user: Student;
  error: string;
  isLoading: boolean = true;

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog) { }

  async ngOnInit() {
    try{
      let response = await this.userService.getProfile(this.authService.loggedInUser().position);
      if(!response.success) this.error = response.message;
      else this.user = response.data;

      console.log(this.user)
      this.isLoading = false;
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
  }

}