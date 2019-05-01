import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as Materialize from '../../../assets/js/materialize.min.js';
import { News } from '../../model/news';
import { NewsDialogComponent } from '../dialog/news/news.component';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: News[];
  options:Object;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.options = {
      padding: 10,
      numVisible: 5,
      fullWidth: true
    };

    this.news = [
      { 
        title: "McConnell blocks resolution calling for Mueller report to be released publicly", 
        body: `Senate Majority Leader Mitch McConnell (R-Ky.) on Monday blocked a resolution calling for special counsel Robert Mueller's report to be released publicly. 

        Senate Minority Leader Charles Schumer (D-N.Y.) asked for unanimous consent for the nonbinding resolution, which cleared the House 420-0, to be passed by the Senate following Mueller's submission of his final report on Friday. `,
        date: new Date().toLocaleString(),
        category: "news"
      },
      { 
        title: "Pentagon authorizes $1B in counter-drug money for Trump's border wall", 
        body: `Senate Majority Leader Mitch McConnell (R-Ky.) on Monday blocked a resolution calling for special counsel Robert Mueller's report to be released publicly. 

        Senate Minority Leader Charles Schumer (D-N.Y.) asked for unanimous consent for the nonbinding resolution, which cleared the House 420-0, to be passed by the Senate following Mueller's submission of his final report on Friday. `,
        date: new Date().toLocaleString(),
        category: "news"
      },
      { 
        title: "Elizabeth Warren after TMZ catches her sprinting to catch train: 'Try and keep up'", 
        body: `Senate Majority Leader Mitch McConnell (R-Ky.) on Monday blocked a resolution calling for special counsel Robert Mueller's report to be released publicly. 

        Senate Minority Leader Charles Schumer (D-N.Y.) asked for unanimous consent for the nonbinding resolution, which cleared the House 420-0, to be passed by the Senate following Mueller's submission of his final report on Friday. `,
        date: new Date().toLocaleString(),
        category: "news"
      }
    ]
    
  
  }

  ngAfterViewInit(){
    const elems = document.querySelectorAll('.carousel');
    const instances = Materialize.Carousel.init(elems, this.options);

    // const indicators= document.querySelector(".indicators");
    // indicators.setAttribute('class', 'indicators');

    // console.log(indicators)
  }

  popup(news: News){
    const dialogRef = this.dialog.open(NewsDialogComponent, {
      width: '80%',
      data: news
    });
  }


}
