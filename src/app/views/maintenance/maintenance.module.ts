import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMaintenanceComponent } from './add-maintenance/add-maintenance.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { AssuranceComponent } from './assurance/assurance.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisiteTechComponent } from './visite-tech/visite-tech.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChangementPneuxComponent } from './changement-pneux/changement-pneux.component';
import { VidangeComponent } from './vidange/vidange.component';
import { HistoriquemaintenanceComponent } from './historiquemaintenance/historiquemaintenance.component';
// Routing


@NgModule({
  imports: [
     CommonModule,
     ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
   MaintenanceRoutingModule,
   NgxPaginationModule,
  ],
  declarations: [
      
    AddMaintenanceComponent,
            AssuranceComponent,
            VisiteTechComponent,
            ChangementPneuxComponent,
            VidangeComponent,
            HistoriquemaintenanceComponent
  ]
})
export class MaintenanceModule { }
