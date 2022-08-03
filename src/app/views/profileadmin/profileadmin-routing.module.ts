import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileadminComponent } from './profileadmin.component';
const routes: Routes = [
    {
        path: '',
        component: ProfileadminComponent,
        data: {
          title: 'Profile Admin'
        }
      }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfileAdminRoutingModule {}
  