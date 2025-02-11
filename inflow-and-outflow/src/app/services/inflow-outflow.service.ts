import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { AuthState } from '../interfaces/state.interface';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { InflowOutflow } from '../models/inflowOutflow.model';

@Injectable({
  providedIn: 'root',
})
export class InflowOutflowService {
  constructor(private fireStore: Firestore, private store: Store<AuthState>) {}

  makeInflowOutflow(inflowOutflow: InflowOutflow): Promise<any> {
    return firstValueFrom(this.store.select('user')).then((user: any) => {
      if (user?.user.uid) {
        const inflowCollection = collection(
          this.fireStore,
          `Users/${user.user.uid}/${inflowOutflow.type}`
        );
        const inflowDoc: DocumentReference = doc(inflowCollection);
        return setDoc(inflowDoc, {
          description: inflowOutflow.description,
          amount: inflowOutflow.amount,
          type: inflowOutflow.type,
          id: inflowDoc.id,
        });
      } else {
        throw new Error('Usuario no válido o UID no disponible.');
      }
    });
  }
}
