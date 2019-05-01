import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatDialog, MatTableDataSource, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { FileviewerComponent } from '../../../components/dialog/fileviewer/fileviewer.component';

@Component({
  selector: 'app-assignment-sheet',
  templateUrl: './assignment-sheet.component.html',
  styleUrls: ['./assignment-sheet.component.css']
})
export class AssignmentSheetComponent implements OnInit {

  assignments;
  displayedColumns: any[];
  dataSource: MatTableDataSource<any[]>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AssignmentSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialog: MatDialog) { 
      this.displayedColumns = [ "sn", "fullname", "matricNo", "score", "options"];
    }

  ngOnInit() {
    this.assignments = [
      {
        id: 1, fullname: "James Williams", matricNo: '10191898988', file: "http://localhost:4000/uploads/course/test.pdf", body: "Hello", score: "9"
      },
      {
        id: 2, fullname: 'Jeremiah Wills', matricNo: '10191898999', file: "http://localhost:4000/uploads/course/test.pdf", body: "Hello", score: "8"
      },
      {
        id: 3, fullname: 'Riah Klint', matricNo: '10191898988', file: "http://localhost:4000/uploads/course/test.pdf", body: "Hello", score: ""
      },
      {
        id: 4, fullname: 'Zeruban Stout', matricNo: '111019189898', file: "http://localhost:4000/uploads/course/test.pdf", body: "Hello", score: ""
      },
      {
        id: 5, fullname: 'Jonathan Richy Stout', matricNo: '10191898987', file: "http://localhost:4000/uploads/course/test.pdf", body: "Hello", score: ""
      },
      {
        id: 6, fullname: "Isaiah Williams Stout", matricNo: '10191898986', file: "http://localhost:4000/uploads/course/test.pdf", body: "Hello", score: ""
      }
    ]

    this.dataSource = new MatTableDataSource(this.assignments);
  }

  close(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
  
  openViewer(url: string): void{
    const dialogRef = this.dialog.open(FileviewerComponent, {
      width: '80%',
      data: { url: url }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed")
    })
  }

  applyFilter(filterValue: string) {
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  changed(){
    console.log(this.dataSource)
  }

  updateAssignment(){
    console.log(this.dataSource.data)
  }

  resetAssignment(){
    console.log(this.assignments)
    // let assignmentsCopy = [];
    // Object.assign(assignmentsCopy,this.assignments);
    // console.log(assignmentsCopy)
    // this.dataSource = new MatTableDataSource(assignmentsCopy);
  }
}
