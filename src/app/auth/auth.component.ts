import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  error: string = null;
  form: FormGroup;

  constructor(private authService: AuthService, 
              private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(150)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(150)])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const email = this.form.controls["email"].value;
    const password = this.form.controls["password"].value;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    authObs = this.authService.login(email, password);
    console.log(email, password);
    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/admon']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.form.reset();
  }

}
