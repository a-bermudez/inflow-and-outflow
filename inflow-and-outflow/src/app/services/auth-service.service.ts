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
import { User } from '../models/user.model';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  name: string = 'pepe';
  protected auth = getAuth();
  constructor(private router: Router, private firestore: Firestore) {}

  initAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      console.log('Bienvenido ', user?.email);
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
    Swal.fire({
      title: 'Espere mientras se crea su identidad por favor',
      willOpen: () => {
        Swal.showLoading();
      },
    });
    createUserWithEmailAndPassword(this.auth, email, passWord)
      .then(({ user }) => {
        const newUser = new User(user.uid, name, email);
        const usersCollection = collection(this.firestore, 'Users');
        return addDoc(usersCollection, {
          uid: user.uid,
          nickName: name,
          email: email,
        })
          .then(() => {
            Swal.close();
            this.router.navigate(['/dashboard']);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      });
  }

  loginUser(email: string, password: string): void {
    Swal.fire({
      title: 'Espere mientras se confirma su identidad por favor',
      willOpen: () => {
        Swal.showLoading();
      },
    });
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userLogIn: UserCredential) => {
        const user = userLogIn.user;
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      });
  }
  logout() {
    return this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
