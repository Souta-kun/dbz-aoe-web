import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  sub:Subscription;
  logged: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user => {
      this.logged = !!user;
    })
  }

  onRedirect() {
    this.router.navigate(['auth']);
  }

  onLogout() {
    this.authService.logout();
  }

  onImg() {
    this.router.navigate(['/home/news']);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
