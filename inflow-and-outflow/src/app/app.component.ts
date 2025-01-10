import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'inflow-and-outflow';

  constructor(private auth: Auth, private authService: AuthService) {
    console.log('Firebase Auth ready:', this.auth);
    this.authService.initAuthListener();
  }
}
