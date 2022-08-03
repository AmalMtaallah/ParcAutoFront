import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionsService } from '../../mission/MissionService.service';
import { NotificationService } from '../notificationService.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
notif:any;
message:any;
p : number=1;
  constructor(private router : ActivatedRoute,private notifServ:NotificationService,private serv:MissionsService) { }

  ngOnInit(): void {
this.AllNotif();
  
  }
AllNotif(){
  this.serv.getnotfadmin().subscribe(res=>{
    this.notif=res;
    // this.message=this.notif[0].message;
    // console.log(this.notif);
  })
}
  suppNotif(id:any){
    this.notifServ.deleteNotif(id).subscribe(res=>{
      console.log(res);
      this.AllNotif();
    })
  }

}
