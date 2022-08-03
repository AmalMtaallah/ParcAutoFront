import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionsService } from '../mission/MissionService.service';


@Component({
  templateUrl: 'alerts.component.html',
})
export class AlertsComponent {

  alertes:any=""
  constructor(private serv:MissionsService) {
  }
  ngOnInit(): void {
    this.getalertes();  
      }

  
public getalertes(){
  this.serv.getalertes().subscribe( res=>{
    this.alertes=res;
  });
}
 
}
