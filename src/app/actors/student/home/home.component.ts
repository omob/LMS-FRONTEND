import { Component, OnInit } from '@angular/core';
import { MatDatepickerToggle } from '@angular/material';
import { ChartType } from 'chart.js';
import { SingleDataSet } from 'ng2-charts';
import { Student } from 'src/app/model/student';
import { Assignment } from './../../../model/assignment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class StudentHomeComponent implements OnInit {

  student: Student;
  myAssignment: Assignment[];
  displayedColumns:string[];
  events: any[] = [];
  datePicker: MatDatepickerToggle<{}>

  pieChartLabels: string[] = [ "Courses", "Students", "Test", "Assignments"]
  pieChartData: SingleDataSet = [3, 10, 23, 10];
  chartType: ChartType = "pie";
  pieChartLegend = true;
  
  constructor() { 
    // this.datePicker  
  }

  ngOnInit() {
    this.myAssignment = [
      { _id: "1", courseCode: "CSC103", status: "completed", dueDate: "24-01-2019" },
      { _id: "2", courseCode: "CSC303", status: "completed", dueDate: "04-02-2019" },
      { _id: "3", courseCode: "CSC603", status: "pending", dueDate: "10-01-2019" },
      { _id: "4", courseCode: "CSC703", status: "completed", dueDate: "14-01-2019" },
      { _id: "5", courseCode: "CSC803", status: "pending", dueDate: "22-02-2019" },

    ]

    this.displayedColumns= [ '_id', 'courseCode', 'status', 'dueDate', 'options'];

  }

  
  chartHovered( $event): void{

  }

  chartClicked( $event): void{

  }
}