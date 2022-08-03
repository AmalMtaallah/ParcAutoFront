import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { MissionsComponent } from './missions/missions.component';
import { AjouterMissionComponent } from './ajouter-mission/ajouter-mission.component';
import { DetailMissionComponent } from './detail-mission/detail-mission.component';
import { EditMissionComponent } from './edit-mission/edit-mission.component';
//import { GeofenceComponent } from './geofence/geofence.component';
import { LiveCartComponent } from './live-cart/live-cart.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Missions'
    },
    children: [
      
    
      {
        path: 'addmission',
        component: AjouterMissionComponent,
        data: {
          title: 'Mission'
        }
      },
      {
        path: 'editmission/:id',
        component: EditMissionComponent,
        data: {
          title: 'Mission'
        }
      },
      {
        path: 'missions',
        component: MissionsComponent,
        data: {
          title: 'Mission'
        }
      },
    {
        path: 'Leaflet',
        component: AddMissionComponent,
        data: {
          title: 'Leaflet'
        }
      },
      // {
      //   path: 'geofence',
      //   component: GeofenceComponent,
      //   data: {
      //     title: 'Leaflet'
      //   }
      // },
     
      {
        path: 'liveCart/:id',
        component: LiveCartComponent,
        data: {
          title: 'LiveCart'
        }
      },
      {
        path: 'detailLivraison/:id',
        component:DetailMissionComponent ,
        data: {
          title: 'DetailLivraison'
        }
      },
    ]
},
     

      

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionsRoutingModule {}
