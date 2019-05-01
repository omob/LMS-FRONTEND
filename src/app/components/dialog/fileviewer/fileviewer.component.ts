import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-fileviewer',
  templateUrl: './fileviewer.component.html',
  styleUrls: ['./fileviewer.component.css']
})
export class FileviewerComponent implements OnInit {

  error: {success: boolean, message: string};
  loading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<FileviewerComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.error = {
        success: true,
        message: undefined
      }
    }

  ngOnInit() {
  }

  onCloseClick(): void{
    this.dialogRef.close();
  }

  callBackFn($event){
    this.loading = false;
  }

  // pageRendered(e: CustomEvent) {
  //   console.log('(page-rendered)', e);
  // }

  onError($event){
    this.error.success = false;
    this.error.message = $event;
    this.loading = false;
  }
}


interface DialogData{
  url: string;
  title: string;
}
