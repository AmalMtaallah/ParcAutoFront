import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMaintenanceComponent } from './add-maintenance/add-maintenance.component';
import { AssuranceComponent } from './assurance/assurance.component';
import { VisiteTechComponent } from './visite-tech/visite-tech.component';
import { ChangementPneuxComponent } from './changement-pneux/changement-pneux.component';
import { VidangeComponent } from './vidange/vidange.component';
import { HistoriquemaintenanceComponent } from './historiquemaintenance/historiquemaintenance.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Maintenance'
    },
    children: [
        {
            path: 'assurance',
            component: AssuranceComponent,
            data: {
              title: 'Assurance'
            }
          },
          {
            path: 'visiteTech',
            component: VisiteTechComponent,
            data: {
              title: 'Visite Technique'
            }
          },
          {
            path: 'pneux',
            component: ChangementPneuxComponent,
            data: {
              title: 'Changement Pneux'
            }
          },
          {
            path: 'vidange',
            component: VidangeComponent,
            data: {
              title: 'Vidange'
            }
          },
          {
            path: 'historique',
            component: HistoriquemaintenanceComponent,
            data: {
              title: 'Vidange'
            }
          },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule {}
