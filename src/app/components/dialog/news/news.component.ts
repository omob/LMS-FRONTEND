import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewsDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: newsDialog) { }

  ngOnInit() {
  }

}

interface newsDialog{
  title: string;
  body: string;
  date: string;
  category: string;
}