import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    PipesModule,
  ],
  exports: [DetailsComponent],
})
export class DetailsModule {}
