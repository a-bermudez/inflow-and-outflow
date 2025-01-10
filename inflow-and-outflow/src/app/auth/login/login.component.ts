import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  registerRoute: string = '/register';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      passWord: ['', Validators.required],
    });
  }
  loginUser(): void {  
    const {email,passWord} = this.loginForm.value
    this.authService.loginUser(email, passWord)
  }
}
