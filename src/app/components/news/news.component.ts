import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  posts = [
    {
      title: 'Cena Dbz',
      date: '2012-02-21',
      message: 'Todos los miembros del clan o amigos que están en nuestro discord pueden llegar a la fiesta navideña del clan Dbz ... los esperamos 14',
      messageImagePath: 'https://scontent.fsal2-1.fna.fbcdn.net/v/t1.0-9/132557439_204403257987941_307335167125627793_n.jpg?_nc_cat=105&ccb=3&_nc_sid=8bfeb9&_nc_ohc=TcDJ010AQ5AAX_fwA6-&_nc_ht=scontent.fsal2-1.fna&oh=93538d2ca805fd14370fff91ba6ceb1e&oe=605CE9FE'
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
