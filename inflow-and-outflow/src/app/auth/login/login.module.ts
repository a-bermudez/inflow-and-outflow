import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule,ReactiveFormsModule],
  exports: [LoginComponent],
})
export class LoginModule {}
