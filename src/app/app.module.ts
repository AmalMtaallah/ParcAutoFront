import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormGroup, FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Import components
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { ForgotpassComponent } from './views/forgotpass/forgotpass.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
// import { ChauffeurLayoutComponent } from './chauffeur/chauffeur-layout/chauffeur-layout.component';
// import { DashbordChaufComponent } from './views/chauffeurInterface/dashbord-chauf/dashbord-chauf.component';
// import { ChauffeurModule } from './views/chauffeurInterface/chauffeur.module';
import { LogoutComponent } from './views/logout/logout.component';
import { LogoutModule } from './views/logout/logout.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HistoriqueCirculationComponent } from './views/historique-circulation/historique-circulation.component';
import { ProfileadminComponent } from './views/profileadmin/profileadmin.component';
//const config: SocketIoConfig = {url:'http://localhost:3000', options: {}};


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ToasterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  // SocketIoModule.forRoot(config),

  ],
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ForgotpassComponent,
    ResetPasswordComponent,
    // ChauffeurLayoutComponent,
    // LogoutComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  ToasterService
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
