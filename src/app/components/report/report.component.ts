import { Component, OnInit } from '@angular/core';
import { SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  pieChartLabels: string[];
  pieChartData: SingleDataSet;
  chartType: ChartType = "pie";
  pieChartLegend = true;
  cgpa: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.loggedInUser().position == 'student'){
      //fetch cgpa
      this.cgpa = "3.67";
      this.pieChartLabels= [ "Courses","Test", "Assignments"];
      this.pieChartData = [6, 3, 5];

    }else{
      this.pieChartLabels= [ "Courses", "Students", "Test", "Assignments"];
      this.pieChartData = [3, 10, 23, 10];
    }
  }

  chartHovered( $event): void{

  }

  chartClicked( $event): void{

  }
}
