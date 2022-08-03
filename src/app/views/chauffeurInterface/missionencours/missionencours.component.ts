import { Component, OnInit } from '@angular/core';
import { AuthetificationService } from '../../../serviceauth/authetification.service';
import { DashchaufService } from '../../dashboard/dashchauf.service';
import { MissionsService } from '../../mission/MissionService.service';
import * as turf from '@turf/turf'

@Component({
  selector: 'app-missionencours',
  templateUrl: './missionencours.component.html',
  styleUrls: ['./missionencours.component.css']
})
export class MissionencoursComponent implements OnInit {
user:any
missionencours:any
missionTerminer: any="";
coordoné:any=""
distance: number;
distancefinale: string;
  constructor(private auth:AuthetificationService,private serv:DashchaufService,private missionSer:MissionsService) { }

  ngOnInit(): void {
    this.getmissionencourslivraison()
    this.auth.user().subscribe((res)=>{
      this.user = res;
    }, (err) =>{
      console.log(err);
    })
  }
  public terminer(id:any){
    var from = [36.864756339378715,10.163140922614268]
    this.missionSer.getMissionByID(id).subscribe(res=>{
      console.log(res);
      this.missionTerminer=res;
      const id=this.missionTerminer.id;
      console.log(id);
      const destination=this.missionTerminer.adress
      console.log(destination)
      this.missionSer.addressLookup2(destination).subscribe(res=>{
         this.coordoné=res
    console.log(this.coordoné)
     const alt=this.coordoné.features[0].geometry.coordinates[0]
     const long=this.coordoné.features[0].geometry.coordinates[1]
     console.log(long)
     console.log(alt)
    this.distance = turf.distance([long,alt],from);
        this.distancefinale=this.distance.toFixed(2)
     console.log(this.distancefinale)
      })
     
    
      const formData=new FormData();
      this.missionSer.setTerminatedMission(this.distancefinale,id,formData).subscribe(res=>{
        console.log(res);
      })
      this.VidangeNotif(this.missionTerminer.vehicule_id);
      this.notifChangementPneux(this.missionTerminer.vehicule_id);
    
  });
  }
   
VidangeNotif(ids:any){
  this.missionSer.vidangeNotif(ids).subscribe(res=>{
    console.log(res);
    
  })
}
notifChangementPneux(ids:any){
  this.missionSer.notifChangementPneux(ids).subscribe(res=>{
    console.log(res);
    
  })
}
  public getmissionencourslivraison(){
    const u :any =JSON.parse(localStorage.getItem('user')) ;
    this.serv.getmissionencours(u.id).subscribe(res=>{
      this.missionencours=res
      console.log(this.missionencours)
    })
  }

}
