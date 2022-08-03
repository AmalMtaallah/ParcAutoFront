import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChauffeurRoutingModule } from './chauffeur-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DashbordChaufComponent } from './dashbord-chauf/dashbord-chauf.component';
import { ProfilechaufComponent } from './profilechauf/profilechauf.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailmissionComponent } from './detailmission/detailmission.component';
import { MissionencoursComponent } from './missionencours/missionencours.component';
import { ModalModule } from 'ngx-bootstrap/modal';

// Routing


@NgModule({
  imports: [
    FormsModule,
    ChauffeurRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),



  ],
  declarations: [
    DashbordChaufComponent,
    ProfilechaufComponent,
    DetailmissionComponent,
    MissionencoursComponent
  ]
})
export class ChauffeurModule { }
