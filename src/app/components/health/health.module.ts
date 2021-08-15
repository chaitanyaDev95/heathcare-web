import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRoutingModule } from './health-routing.module';
import { HealthComponent } from './health/health.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    HealthComponent
  ],
  imports: [
    MatCardModule,
    CommonModule,
    HealthRoutingModule
  ]
})
export class HealthModule { }
