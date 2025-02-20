import { Component, OnInit } from '@angular/core';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { AppState } from 'src/app/interfaces/state.interface';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  currentUser!: User;
  userName!: string;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private firestore: Firestore
  ) {}
  ngOnInit(): void {
    this.store
      .select('user')
      .pipe(
        filter(
          (userState) => userState.user !== null && userState.user !== undefined
        ),
        take(1)
      )
      .subscribe(({ user }) => {
        if (user.nickName) {
          const userRef = doc(this.firestore, `/Users/${user?.uid}`);
          onSnapshot(userRef, (doc) => {
            this.currentUser = doc.data() as User;
            this.userName = this.currentUser?.nickName;
          });
        }
      });
  }
  logout() {
    this.authService.logout();
  }
}
