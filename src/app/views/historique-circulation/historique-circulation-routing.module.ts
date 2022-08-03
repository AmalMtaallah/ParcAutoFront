import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriqueCirculationComponent } from './historique-circulation.component';

const routes: Routes = [
  {
    path: '',
    component: HistoriqueCirculationComponent,
    data: {
      title: 'Historique Circulation'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriqueCirculationRoutingModule {}
