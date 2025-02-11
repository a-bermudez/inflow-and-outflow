import { Component, OnDestroy, OnInit } from '@angular/core';
import { deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { AppState } from 'src/app/interfaces/state.interface';
import { InflowOutflow } from 'src/app/models/inflowOutflow.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  inflowOutflow: InflowOutflow[] = [];
  subscriptions: Subscription = new Subscription();
  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select('inflowOutflow')
        .pipe(distinctUntilChanged())
        .subscribe(({ items }) => {
          if (items.length > 0) {
            this.inflowOutflow = items;
          }
        })
    );
  }
  deleteRow(rowId: string, itemType: string) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta entrada?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.add(
          this.store.select('user').subscribe(({ user }) => {
            const docRef = doc(
              this.firestore,
              `/Users/${user.uid}/${itemType}/${rowId}`
            );
            deleteDoc(docRef);
          })
        );
        Swal.fire('Saved!', '', 'success');
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
