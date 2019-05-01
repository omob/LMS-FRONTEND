import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FileviewerComponent } from './../../../components/dialog/fileviewer/fileviewer.component';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  user: Student;
  error: string;
  message: string;

  userForm:Student;

  nationalities$: Observable<Object>;
  nationalities;
  states: any[];
  selectedFile: File;
  uploadFileButton: boolean = false;
  uploadReport: string;
  docName: string;

  isLoading: boolean = true;

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router) { 
   }

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
      documents: {}
    }

    try{
      let response = await this.userService.getProfile(this.authService.loggedInUser().position);
      if(!response.success) this.error = response.message;
      else this.user =  Object.assign(this.userForm, response.data);

      this.isLoading = false;

      this.nationalities = await this.userService.get('/api/nationalities');
      this.getState();
    }
    catch(e){
      console.log(e);
      this.isLoading = false;
      this.error = "Error loading, please try again later";
    }
  }

  getState(){
    let sort = this.nationalities.filter(n => this.user.nationality == n.nationality);
    this.states = sort[0].states;
  }

  async update(){
    let response = await this.userService.updateProfile(this.authService.loggedInUser().position, this.user);
    this.message = response.message;
  }

  onFileChangeSelected(event){
      console.log(event)
      this.selectedFile = <File>event.target.files[0];
  }

  onClick(event){
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

  goBack(): void{
    this.router.navigateByUrl('/student/profile');
  }

  openViewer(files: { url: string, docName: string}): void{
    const dialogRef = this.dialog.open(FileviewerComponent, {
      width: '80%',
      data: { url: files.url, title:  files.docName }
    });
  }


}
