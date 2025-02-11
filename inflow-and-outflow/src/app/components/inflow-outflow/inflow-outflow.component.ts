import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AppState } from 'src/app/interfaces/state.interface';
import { InflowOutflow } from 'src/app/models/inflowOutflow.model';
import { InflowOutflowService } from 'src/app/services/inflow-outflow.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inflow-outflow',
  templateUrl: './inflow-outflow.component.html',
  styleUrls: ['./inflow-outflow.component.scss'],
})
export class InflowOutflowComponent implements OnInit {
  isLoading: boolean = false;
  inflowForm!: FormGroup;
  type: string = 'inflow';
  constructor(
    private formBuilder: FormBuilder,
    private inflowOutflowService: InflowOutflowService,
    private store: Store<AppState>,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.inflowForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }
  getLoadingState(): void {
    this.store
      .select('ui')
      .pipe(take(1))
      .subscribe((loader) => {
        this.isLoading = loader.isLoading;
      });
  }

  save() {
    if (this.inflowForm.invalid) {
      return;
    }
    this.store.dispatch(isLoading());
    this.getLoadingState();
    setTimeout(() => {
      this.store.dispatch(stopLoading());
      this.getLoadingState();
      const validInflowOutflow: InflowOutflow = {
        description: this.inflowForm.get('description').value,
        amount: this.inflowForm.get('amount').value,
        type: this.type,
      };
      this.inflowOutflowService
        .makeInflowOutflow(validInflowOutflow)
        .then(() => {
          Swal.fire(
            'Registro guardado',
            validInflowOutflow.description,
            'success'
          );
        })
        .catch((error) => {
          console.error(error);

          Swal.fire(
            'Ha habido un problema',
            validInflowOutflow.description,
            'error'
          );
        });
      this.inflowForm.reset();
    }, 2500);
  }
}
