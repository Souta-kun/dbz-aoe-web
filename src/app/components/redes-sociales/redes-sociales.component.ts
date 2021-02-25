import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedService } from 'src/app/services/red.service';

@Component({
  selector: 'app-redes-sociales',
  templateUrl: './redes-sociales.component.html',
  styleUrls: ['./redes-sociales.component.css']
})
export class RedesSocialesComponent implements OnInit {
  redes = [];
  
  constructor(private redService: RedService,
              private router: Router) { }

  ngOnInit(): void {
    this.redes = this.redService.getRedes();
  }
  
  onRedirect(url: string) {
    window.open(url, '_blank');
  }
}
