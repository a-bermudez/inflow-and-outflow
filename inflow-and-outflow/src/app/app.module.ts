import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InflowComponent } from './components/inflow-outflow/inflow/inflow.component';
import { OutflowComponent } from './components/inflow-outflow/outflow/outflow.component';
import { InflowOutflowComponent } from './components/inflow-outflow/inflow-outflow.component';
import { StatsComponent } from './components/inflow-outflow/stats/stats.component';
import { DetailsComponent } from './components/inflow-outflow/details/details.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InflowComponent,
    OutflowComponent,
    InflowOutflowComponent,
    StatsComponent,
    DetailsComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
