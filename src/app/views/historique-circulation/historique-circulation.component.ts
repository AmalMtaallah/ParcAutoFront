import { Component, OnInit } from '@angular/core';
import { MissionsService } from '../mission/MissionService.service';
import * as turf from '@turf/turf'

@Component({
  selector: 'app-historique-circulation',
  templateUrl: './historique-circulation.component.html',
  styleUrls: ['./historique-circulation.component.css']
})
export class HistoriqueCirculationComponent implements OnInit {
  p : number=1;
  missionster:any=""
  adress:any=""
  coordoné:any=""
  distance:any=""
  distancefinale:any=""
  constructor(private serv:MissionsService) { }

  ngOnInit(): void {
this.getmissions()
  }

  public getmissions(){
    var from = [36.864756339378715,10.163140922614268]
    this.serv.AllTerminatedMission().subscribe(res=>{
    this.missionster=res
    console.log(this.missionster)
    })
  }
  public recherchemissionbyparametre(key){
    
    key == '' || key[0] ==" "?  this.getmissions(): this.serv.chercher(key).subscribe(data=>{
      this.missionster=data;
      console.log(this.missionster);
    });
    
   
  }

}
