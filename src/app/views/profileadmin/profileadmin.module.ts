import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileadminComponent } from './profileadmin.component';
import { ProfileAdminRoutingModule } from './profileadmin-routing.module';

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      ProfileAdminRoutingModule,
    ],
    declarations: [  
 ProfileadminComponent
    ]
  })
  export class ProfileAdminModule { }
  