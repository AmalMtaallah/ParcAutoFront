import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';


import { MissionsRoutingModule } from './mission-routing.module';
import { AddMissionComponent } from './add-mission/add-mission.component';
// Timepicker
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { MissionsComponent } from './missions/missions.component';
import { AgmCoreModule } from '@agm/core';
import { AjouterMissionComponent } from './ajouter-mission/ajouter-mission.component';
// Routing
// Ngx-Quill
import { QuillModule } from 'ngx-quill';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DetailMissionComponent } from './detail-mission/detail-mission.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditMissionComponent } from './edit-mission/edit-mission.component';

import { LiveCartComponent } from './live-cart/live-cart.component';
@NgModule({
  imports: [
   MissionsRoutingModule,
   TimepickerModule.forRoot(),
   BsDatepickerModule.forRoot(),
   SelectModule,
   FormsModule,
   QuillModule,
   ModalModule.forRoot(),
   NgxPaginationModule,
   ReactiveFormsModule,
  CommonModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA'
    // To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app
  })
 
  ],
  declarations: [
    
  
    AddMissionComponent,
    MissionsComponent,
    AjouterMissionComponent,
    DetailMissionComponent,
    EditMissionComponent,
    LiveCartComponent
  ]
})
export class MissionsModule { }
