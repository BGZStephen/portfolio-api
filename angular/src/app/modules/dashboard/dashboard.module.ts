import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthService } from '../../services/auth.service';

// router
import { DashboardRouter } from './dashboard.routes';

// components
import {
  DashboardViewComponent,
  DashboardHomeComponent,
  DashboardNavbarComponent,
  DashboardLoginComponent,
  DashboardWorkComponent,
} from './components/dashboard-components-barrel';

@NgModule({
  declarations: [
    DashboardViewComponent,
    DashboardHomeComponent,
    DashboardNavbarComponent,
    DashboardLoginComponent,
    DashboardWorkComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DashboardRouter
  ],
  providers: [AuthService],
  bootstrap: []
})
export class DashboardModule { }
