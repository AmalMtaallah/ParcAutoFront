import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { ChauffListComponent } from './chauff-list/chauff-list.component';
import { DetailChauffComponent } from './detail-chauff/detail-chauff.component';
import { ModifierChauffComponent } from './modifier-chauff/modifier-chauff.component';
import { AddvehiculeComponent } from './addvehicule/addvehicule.component';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { DetailVehiComponent } from './detail-vehi/detail-vehi.component';
import { EditVehiComponent } from './edit-vehi/edit-vehi.component';
const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Chauffeur'
      },
      children: [
        {
          path: 'ajouterchauffeur',
          component:ChauffeurComponent,
          data: {
            title: 'addChaufeur'
          }
        },
  
        {
          path: 'chauffeurs',
          component:ChauffListComponent ,
          data: {
            title: 'Chauffeurs'
          }
        },
        {
          path: 'detailCauff/:id',
          component:DetailChauffComponent ,
          data: {
            title: 'DetailCauff'
          }
        },
        {
          path: 'updateCauff/:id',
          component:ModifierChauffComponent ,
          data: {
            title: 'UpdateCauffeur'
          }
        },
       
      ]
    },
    {
          path: '',
          data: {
            title: 'Vehicules'
          },
          children: [
          
            {
              path: 'addvehicule',
              component: AddvehiculeComponent,
              data: {
                title: 'AddVehicule'
              }
            },
           
            {
              path: 'vehicules',
              component: VehiculesComponent,
              data: {
                title: 'Vehicules'
              }
            },
            {
              path: 'detail-vehi/:id',
              component: DetailVehiComponent,
              data: {
                title: 'Detail-Vehicules'
              }
            },
            {
              path: 'edit-vehi/:id',
              component: EditVehiComponent,
              data: {
                title: 'Edit-Vehicules'
              }
            },
          
          ]
        }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class GestionRoutingModule {}
  