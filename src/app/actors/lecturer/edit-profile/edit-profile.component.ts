import { MatDialog } from '@angular/material';
import { FileviewerComponent } from '../../../components/dialog/fileviewer/fileviewer.component';
import { DialogData } from './../../../model/dialogData';
import { AuthService } from 'src/app/services/auth.service';
import { Lecturer } from './../../../model/lecturer';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class LecturerEditProfileComponent implements OnInit {
  user: Lecturer;
  message;
  userForm:Lecturer;

  nationalities$: Observable<Object>;
  nationalities;
  states: any[];
  selectedFile: File;
  uploadFileButton: boolean = false;
  uploadReport: string;
  docName: string;

  constructor(
    private userService: UserService, 
    private authService: AuthService, 
    private router: Router,
    private dialog: MatDialog) { }

  async ngOnInit() {
    this.userForm = {
      name: {
          firstName: "",
          lastName: "",
          middleName: ""
      },
      email: "",
      mobile: "",
      telephone: "",
      sex: "",
      nationality: "",
      stateOfOrigin: "",
      localGov: "",
      address_current: {
          line1: "",
          line2: "",
          city: "",
          state: "",
          country: "",
          postalCode: ""
      },
      address_permanent: {
          line1: "",
          line2: "",
          city: "",
          state: "",
          country: "",
          postalCode: ""
      },
      dob: "",
      sponsor: {
          firstName: "",
          lastName: "", 
          email: "",
          phone: ""
      },
      nextOfKin: {
          firstName: "",
          lastName: "", 
          email: "",
          phone: "",
          relationship: ""
      },
      education: {
        primary: {
            name: ""
        },
        secondary: {
            name: ""
        },
        tertiary: {
            name: ""
        }
      },
      professionalProfile: {
          name: ""
      },
      documents: []
    }

    let response = await this.userService.getProfile(this.authService.loggedInUser().position);
    if(!response.success) this.message = response.message;
    else {
      this.user =  Object.assign(this.userForm, response.data); 
      console.log(this.user);
    }
    this.nationalities = await this.userService.get('/api/nationalities');
    this.getState();
  }

  getState() : any[]{
    let sort = this.nationalities.filter(n => this.user.nationality == n.nationality);
    if(sort[0]) this.states = sort[0].states;
    else return [];
  }

  async submitProfile(): Promise<void>{
    try{
      let response = await this.userService.updateProfile(this.authService.loggedInUser().position, this.user);
      if(response.success) this.router.navigateByUrl('/lecturer/profile');

      this.message = response.message;
    }
    catch(e){
      console.log(e);
    }
  }

  onFileChangeSelected(event): void{
      console.log(event)
      this.selectedFile = <File>event.target.files[0];
  }

  onClick(event): void{
      console.log(event)
  }

  onSubmit(form){
    console.log(form)
  }


  async onFileUpload(form: HTMLFormElement){

    if(this.selectedFile !== null && form.value.docName !== ""){
        const formData = new FormData();
        formData.append('doc', this.selectedFile, this.selectedFile.name);

        formData.append('docName', form.value.docName);
        try{
            let response = await this.userService.uploadDoc(this.authService.loggedInUser().position, formData)
            if(response.success) {
                this.message = response.message;
                this.user.documents = response.data;
            }else this.message = response.message;
            
            console.log(response)
           form.resetForm();

        }catch(e){
            this.message = e;
            console.log(e)
        }
    }else{
        this.uploadReport = "Fill all fields..."
    }
  }

  async removeDoc(document){
      console.log(document);

    try{
        let response = await this.userService.removeDoc(this.authService.loggedInUser().position, document)
        if(response.success) {
            this.message = response.message;
            this.user.documents = response.data;
        }
        else this.message = response.message;
    
    }catch(e){
        this.message = e;
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

  goBack():void{
    this.router.navigateByUrl('/lecturer/profile');
  }

}
