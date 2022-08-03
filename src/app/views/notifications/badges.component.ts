import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionsService } from '../mission/MissionService.service';
import { NotificationService } from './notificationService.service';

@Component({
  templateUrl: 'badges.component.html'
})
export class BadgesComponent {
  rappels:any=""

  constructor(private serv:MissionsService,private notifServ:NotificationService) { }
  ngOnInit(): void {
    this.getrappels();  
      }
      public getrappels(){
        this.notifServ.getrappel().subscribe(res=>{
          this.rappels=res;
        });
      }

}
