import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthResponseData, AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  error: string = null;
  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(150),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(150),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.login(email, password);

    authObs.subscribe(
      (response) => {
        this.router.navigate(['/admon']);
      },
      (errorMessage) => {
        this.error = errorMessage;
      }
    );

    this.form.reset();
  }
}
