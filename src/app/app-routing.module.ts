import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ChauffeurLayoutComponent } from './chauffeur';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AfterLoginService } from './serviceauth/after-login.service';
import { BeforeLoginService } from './serviceauth/before-login.service';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { ForgotpassComponent } from './views/forgotpass/forgotpass.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { ProfileadminComponent } from './views/profileadmin/profileadmin.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
// import { ChauffeurModule } from './views/chauffeurInterface/chauffeur.module';
import { AfterLoginChaufService } from './serviceauth/after-loginchauf.service';
import { RoleGuard } from './serviceauth/role.guard';
export const routes: Routes = [
 
  {
    path: '',
    component: LoginComponent,
    canActivate:[BeforeLoginService],

    data: {
      title: 'Login Page'
    }
  },
  
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[BeforeLoginService],

    data: {
      title: 'Login Page'
    }
  },
  
 
  // {
  //   path: 'profile',
  //   component: ProfileadminComponent,
  //   canActivate:[AfterLoginService],
  //   data: {
  //     title: 'Login Page'
  //   }
  // },

  {
    path: 'logout/loginn',
   component: LoginComponent,
    canActivate:[AfterLoginService],

    data: {
      title: 'Logout Page'
    }
  },
  {
    path: '',
    
    redirectTo: 'dashboard',

    pathMatch: 'full',
  
  },
  
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
 
  //test
  // {
  //   path: 'dashboard/login',
  //   component: LoginComponent,
  //   data: {
  //     title: 'Logintest Page'
  //   }
  // },
   //testtt
   

  {
    path:'forgot-password',
    component: ForgotpassComponent,
   canActivate:[BeforeLoginService],

    data: {
      title: 'Forgot Page'
    }
  },
  {
    path:'reset-password',
     component: ResetPasswordComponent,
    canActivate:[BeforeLoginService],  
  data: {
    title: 'Reset Page'
  }
},

  {
    path: 'register',
    
    component: RegisterComponent,
    canActivate:[AfterLoginService],
    data: {
      title: 'Register Page'
    }
  },
  
 
 {
    path: '',
    component: DefaultLayoutComponent,
    canActivate:[AfterLoginService],

    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'gestion',
        loadChildren: () => import('./views/gestion/gestion.module').then(m => m.GestionModule)
      },
      {
        path: 'mission',
        loadChildren: () => import('./views/mission/mission.module').then(m => m.MissionsModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('./views/logout/logout.module').then(m => m.LogoutModule)
      },
     
  
      {
        path: 'profileAdmin',
        loadChildren: () => import('./views/profileadmin/profileadmin.module').then(m => m.ProfileAdminModule)
      },
    
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      
     
      {
        path: 'live-cart',
        loadChildren: () => import('./views/google-maps/google-maps.module').then(m => m.GoogleMapsModule)
      },
      {
        path: 'historiquecirc',
        loadChildren: () => import('./views/historique-circulation/historique-circulation.module').then(m => m.HistoriqueCirculationModule)
      },
    
      {
        path: 'maintenance',
        loadChildren: () => import('./views/maintenance/maintenance.module').then(m => m.MaintenanceModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      
    
      {
        path: 'apps',
        loadChildren: () => import('./views/apps/apps.module').then(m => m.AppsModule)
      },
     
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate:[AfterLoginChaufService],

    data: {
      title: 'Home'
    },
    children: [
    {
      path: 'chauffeur',
      loadChildren: () => import('./views/chauffeurInterface/chauffeur.module').then(m => m.ChauffeurModule)
    },
    {
      path: 'dashboardchauffeur',
      loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
