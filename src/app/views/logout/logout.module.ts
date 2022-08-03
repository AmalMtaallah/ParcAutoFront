import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
LogoutRoutingModule,
FormsModule,
CommonModule,

  ],
  providers: [],
  declarations: [ LogoutComponent ],
  bootstrap: [ LogoutComponent ]
})
export class LogoutModule { }
