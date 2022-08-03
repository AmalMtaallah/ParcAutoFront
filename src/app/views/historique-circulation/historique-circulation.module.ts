import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import {HistoriqueCirculationComponent } from './historique-circulation.component';
import { HistoriqueCirculationRoutingModule } from './historique-circulation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    //FormsModule,
    HistoriqueCirculationRoutingModule,
    NgxPaginationModule
  ],
  providers: [],
  declarations: [ HistoriqueCirculationComponent ],
  bootstrap: [HistoriqueCirculationComponent ]
})
export class HistoriqueCirculationModule {}
