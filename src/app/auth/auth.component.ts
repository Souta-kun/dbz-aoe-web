import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { login } from '../store/actions';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  error: string = null;
  subs: Subscription;
  form: FormGroup;

  constructor(private router: Router, private store: Store<AppState>) {
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

  ngOnInit(): void {
    this.subs = this.store.select('user').subscribe(({ error, logged }) => {
      this.error = error;
      if (logged) this.router.navigate(['/admon']);
    });
  }
  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const { email, password } = this.form.value;
    this.store.dispatch(login({ email: email, password: password }));
  }
}
