import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { AppState, State } from 'src/app/interfaces/state.interface';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  loginRoute: string = '/login';
  subscription: Subscription = new Subscription();
  loading: boolean = false;
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nickName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passWord: ['', Validators.required],
    });
    this.subscription.add(
      this.store.select('ui').subscribe((ui: State) => {
        this.loading = ui.isLoading;
        console.info('cargando ui.isLoading is ', this.loading);
      })
    );
  }
  async createUser(): Promise<void> {
    const { nickName, email, passWord } = this.registerForm.value;
    this.store.dispatch(isLoading());
    await this.authService.createUser(nickName, email, passWord);
    this.store.dispatch(stopLoading());
    console.info('cargando ui.isLoading is ', this.loading);
    this.router.navigate(['/dashboard']);

    //Solo es para probar la particion de datos como está arriba,
    // este comentario es para fines academicos
    //  this.authService.createUser(
    //    this.registerForm.get('nickName')?.value,
    //    this.registerForm.get('email')?.value,
    //    this.registerForm.get('passWord')?.value
    //  );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
