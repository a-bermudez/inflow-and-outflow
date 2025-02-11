import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { doc, Firestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { onSnapshot, setDoc, Unsubscribe } from '@firebase/firestore';
import * as authActions from '../auth/auth.actions';
import { User } from '../models/user.model';
import { unSetItems } from '../components/inflow-outflow/inflow-outflow.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  name: string = 'pepe';
  protected auth = getAuth();
  private unsubscribeSnapshot: Unsubscribe | null = null;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private store: Store
  ) {}

  initAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const userRef = doc(this.firestore, `/Users/${user.uid}`);
        this.unsubscribeSnapshot = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            const activeUser: User = User.fromFirebase(
              userData['email'],
              userData['nickName'],
              userData['uid']
            );
            this.store.dispatch(authActions.setUser({ user: activeUser }));
          }
        });
      } else {
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(!!user);
      });
    });
  }

  createUser(name: string, email: string, passWord: string): void {
    createUserWithEmailAndPassword(this.auth, email, passWord)
      .then(({ user }) => {
        const userRef = doc(this.firestore, `Users/${user.uid}`);
        return setDoc(userRef, {
          uid: user.uid,
          nickName: name,
          email: email,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      });
  }

  loginUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    this.auth.signOut().then(() => {
      this.unsubscribeSnapshot();
      this.store.dispatch(authActions.unSetUser());
      this.store.dispatch(unSetItems());
      this.router.navigate(['/login']);
    });
  }
}
