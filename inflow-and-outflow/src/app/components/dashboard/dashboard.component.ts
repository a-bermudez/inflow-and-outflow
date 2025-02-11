import { Component, OnDestroy, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { AuthState } from 'src/app/interfaces/state.interface';
import { InflowOutflow } from 'src/app/models/inflowOutflow.model';
import { setItems } from '../inflow-outflow/inflow-outflow.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  items: InflowOutflow[] = [];
  subscription: Subscription = new Subscription();
  constructor(private store: Store<AuthState>, private firestore: Firestore) {}

  ngOnInit(): void {
    this.getInflowOutflow();
  }

  //Para usar después
  getInflowOutflow() {
    this.subscription.add(
      this.store.select('user').subscribe((user: any) => {
        if (!user?.user?.uid) return;

        const inflowRef = collection(
          this.firestore,
          `/Users/${user?.user?.uid}/inflow`
        );
        const outflowRef = collection(
          this.firestore,
          `/Users/${user?.user?.uid}/outflow`
        );

        const inflow$ = collectionData(inflowRef, {
          idField: 'id',
        }) as Observable<InflowOutflow[]>;
        const outflow$ = collectionData(outflowRef, {
          idField: 'id',
        }) as Observable<InflowOutflow[]>;

        this.subscription.add(
          combineLatest([inflow$, outflow$]).subscribe(([inflow, outflow]) => {
            this.store.dispatch(setItems({ items: [...inflow, ...outflow] }));
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
