import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginRoute: string = '/login';
  registerForm!: FormGroup;
  private auth = inject(Auth);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nickName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passWord: ['', Validators.required],
    });
  }
  createUser(): void {
    const { nickName, email, passWord } = this.registerForm.value;
    this.authService.createUser(nickName, email, passWord);
    //Solo es para probar la particion de datos como está arriba,
    // este comentario es para fines academicos
    //  this.authService.createUser(
    //    this.registerForm.get('nickName')?.value,
    //    this.registerForm.get('email')?.value,
    //    this.registerForm.get('passWord')?.value
    //  );
  }
}
