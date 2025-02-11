import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState, State } from 'src/app/interfaces/state.interface';
import { AuthService } from 'src/app/services/auth-service.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  loading: boolean = false;
  registerRoute: string = '/register';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      passWord: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.subscription.add(
      this.store.select('ui').subscribe((ui: State) => {
        this.loading = ui.isLoading;
      })
    );
  }
  async loginUser(): Promise<void> {
    const { email, passWord } = this.loginForm.value;
    this.store.dispatch(isLoading());
    await this.authService.loginUser(email, passWord);
    this.store.dispatch(stopLoading());
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
