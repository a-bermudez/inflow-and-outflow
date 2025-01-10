import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/enviroments/enviroment';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AsyncPipe,
    SharedModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
