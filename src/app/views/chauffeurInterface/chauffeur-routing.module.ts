import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbordChaufComponent } from './dashbord-chauf/dashbord-chauf.component';
import { DetailmissionComponent } from './detailmission/detailmission.component';
import { MissionencoursComponent } from './missionencours/missionencours.component';
import { ProfilechaufComponent } from './profilechauf/profilechauf.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Chauffeur'
    },
    children: [
      {
        path: 'historique',
        component: DashbordChaufComponent,
        data: {
          title: 'Mission'
        }
      },
      {
        path: 'profile',
        component: ProfilechaufComponent,
        data: {
          title: 'Mission'
        }
      },
      {
        path: 'mission/:id',
        component: DetailmissionComponent,
        data: {
          title: 'Mission'
        }
      },
      {
        path: 'encours',
        component:MissionencoursComponent ,
        data: {
          title: 'Mission'
        }
      },
    ]
},
     

      

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChauffeurRoutingModule {}
