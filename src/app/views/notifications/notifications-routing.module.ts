import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertsComponent } from './alerts.component';
import { BadgesComponent } from './badges.component';
import { ModalsComponent } from './modals.component';
import { NotificationsComponent } from './notifications/notifications.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notifications'
    },
    children: [
      {
        path: '',
        redirectTo: 'notifications'
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: {
          title: 'Notifications'
        }
      },
      {
        path: 'alerts',
        component: AlertsComponent,
        data: {
          title: 'alerts'
        }
      },
      {
        path: 'rappels',
        component: BadgesComponent,
        data: {
          title: 'rappels'
        }
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
