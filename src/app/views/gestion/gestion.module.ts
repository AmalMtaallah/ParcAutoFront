// Angular
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// Components Routing
import { GestionRoutingModule } from './gestion-routing.module';
import { ChauffeurComponent } from '../gestion/chauffeur/chauffeur.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';

import { ChauffListComponent } from './chauff-list/chauff-list.component';
import { DetailChauffComponent } from '../gestion/detail-chauff/detail-chauff.component';
import { ModifierChauffComponent } from '../gestion/modifier-chauff/modifier-chauff.component';
import { AddvehiculeComponent } from './addvehicule/addvehicule.component';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { DetailVehiComponent } from './detail-vehi/detail-vehi.component';
import { EditVehiComponent } from './edit-vehi/edit-vehi.component';
@NgModule({
  imports: [
    CommonModule,
    GestionRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  declarations: [
    ChauffeurComponent,
    ChauffListComponent,
    DetailChauffComponent,
    ModifierChauffComponent,
    AddvehiculeComponent,
    VehiculesComponent,
    DetailVehiComponent,
    EditVehiComponent
  ]
})
export class GestionModule { }
