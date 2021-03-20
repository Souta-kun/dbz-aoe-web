import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  menus = [
    { name: 'Noticias', url: 'post' },
    { name: 'Estrategias', url: 'guide' },
    { name: 'Descargas', url: 'download' }
  ];

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onRedirect(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
}
