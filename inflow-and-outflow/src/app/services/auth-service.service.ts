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
import { onSnapshot, setDoc } from '@firebase/firestore';
import * as authActions from '../auth/auth.actions';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  name: string = 'pepe';
  protected auth = getAuth();
  constructor(
    private router: Router,
    private firestore: Firestore,
    private store: Store
  ) {}

  initAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      console.log(user);
      const userRef = doc(this.firestore, `/Users/${user.uid}`);
      onSnapshot(userRef, (snapshot) => {
        if (snapshot) {
          const userData = snapshot.data();
          const activeUser: User = User.fromFirebase(
            userData['email'],
            userData['nickName'],
            userData['uid']
          );
          this.store.dispatch(authActions.setUser({ user: activeUser }));
        }
      });
      //Comentario con fines academicos, en concreto del uso de getDoc
      // if (user) {
      //   const userRef = doc(this.firestore, `/Users/${user.uid}`);
      //   // Referencia al documento
      //   getDoc(userRef).then((userData) => {
      //     const activeUser: User = User.fromFirebase(
      //       userData.data()['email'],
      //       userData.data()['nickName'],
      //       userData.data()['uid']
      //     );
      //     console.log(activeUser);
      //     this.store.dispatch(authActions.setUser({ user: activeUser }));
      //   });
      // }
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
    return this.auth.signOut().then(() => {
      this.store.dispatch(authActions.unSetUser());
      this.router.navigate(['/login']);
    });
  }
}
