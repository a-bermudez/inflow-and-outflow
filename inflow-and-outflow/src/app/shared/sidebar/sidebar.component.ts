import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout();
  }
}
