import { Component, OnInit } from '@angular/core';
import{MissionsService}from '../MissionService.service';
import { ChauffeurService } from '../../gestion/chauffeur.service';
import { ActivatedRoute ,Router} from '@angular/router';
import { ServiceVehiculeService } from '../../gestion/service-vehicule.service';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'
import { TestBed } from '@angular/core/testing';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import * as turf from '@turf/turf'
@Component({
  selector: 'app-detail-mission',
  templateUrl: './detail-mission.component.html',
  styleUrls: ['./detail-mission.component.css']
})
export class DetailMissionComponent implements OnInit {
mission:any;
date:any;
tempDep:any;
  adress: any;
  tel: any;
  etat: any;
  tempArr: any;
  desc: any;
  chaufID: any;
  chauff:any;
  name: any;
  idch: any;
  vehiculeID: any;
  vehi:any;
  matricule: any;
  imagedirectory :any ='http://127.0.0.1:8000/public/image/';
  image:any="";
  id: any;
  cood:any;
  coodGeofence:any;
  imagedirectoryy :any ='http://127.0.0.1:8000/public/vidange/';
char:any=""
disables: boolean=false;
dest: any;
geofen: any;
  //matricule: any;
  constructor(private missionSer:MissionsService,private serv:ChauffeurService,private router : ActivatedRoute,private route:Router,private servehicule:ServiceVehiculeService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.missionSer.getMissionByID(this.id).subscribe( res=>{
     // console.log(res);
      this.mission=res;
this.date=this.mission.date;
this.tempDep=this.mission.departTime;
this.adress=this.mission.adress;
this.tel=this.mission.tel_Dest;
this.etat=this.mission.etat;
this.tempArr=this.mission.arriveTime;
this.desc=this.mission.description;
this.chaufID=this.mission.user_id;
this.vehiculeID=this.mission.vehicule_id;
this.char=this.mission.chargement;
this.getGeofence();

//console.log(this.vehiculeID);
this.serv.getChauffByID(this.chaufID).subscribe(data=>{
  //console.log(this.chaufID);
  this.chauff=data;
  this.idch=this.chaufID;
 this.name=this.chauff.name
 this.image=this.chauff.image
},

(err) =>{
console.log(err);
})
this.servehicule.getVehiculeByID(this.vehiculeID).subscribe(data=>{
//  console.log(this.vehiculeID);
  this.vehi =data;
  this.matricule=this.vehi.matricule;
  console.log(this.vehi.matricule);
},
(err) =>{
console.log(err);
})

     // console.log(this.mission);
    },
    (err) =>{
      console.log(err);
   
      
    });
    
  }
  profileChauffeur(id:any){

    console.log(id);
    this.route.navigate(['gestion/detailCauff/'+id])
  }
  profileVehicule(id:any){
    this.route.navigate(['gestion/detail-vehi/'+id])
  }
  SuprimerMission(id:any){
    console.log(id);
    this.missionSer.deleteMission(id).subscribe(
      
      res=>{
        console.log(res);
        this.image=this.chauff.image;
        this.route.navigate(['mission/missions'])
        
      }
    )
  
  }
  updateMission(id:any){
    this.route.navigate(['mission/editmission/'+id])
  }

  geofence(){
   
    this.adresscood();

    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A';
    const map = new mapboxgl.Map({
        container: 'geofence', // container ID
        style:'mapbox://styles/mapbox/streets-v11', // style URL
        center: this.dest.features[0].geometry.coordinates, // starting position [lng, lat]
        zoom: 12 // starting zoom
    });

    var draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
      polygon: true,
      trash: true
      }
      });
      map.addControl(draw);

     // map.on("load", async()=> {

     //map.on("draw.create", Coordonee);
   map.on("draw.create", async(e)=> {
      // this.missionSer.addGeofence()
       // console.log(e.features[0].geometry.coordinates[0]);
        this.cood=e.features[0].geometry.coordinates;
        console.log(this.cood);
        //console.log(this.cood[0]);
        this.test(this.cood[0]);
        
       /* this.missionSer.addGeofence(this.mission.id,this.cood[0],this.cood[1]).subscribe(res=>{
          console.log(res);
        });*/
        //this.test(e.features)
      });
       function Coordonee(e) {
        console.log(e.features);
        this.cood=e.features[0].geometry.coordinates[0];
        console.log(this.cood[0]);
     
      }
    
      
 
 }
 async test(cood) {
  console.log('tt'+cood);
  
  const usingObjectAssign = Object.assign([], cood);

  for(let i=0; i<usingObjectAssign.length;i++){
    console.log('array'+usingObjectAssign[i])
  
    
     const formData=new FormData();
         
     formData.append('mission_id',this.mission.id);
     formData.append('GeonfenceLat',usingObjectAssign[i][0]);
     formData.append('GeonfenceLong',usingObjectAssign[i][1]);
      this.missionSer.addGeofence(formData).subscribe(res=>{
        console.log(res);
       // console.log(this.coodGeofence[0]);
        
      });
  }
  }
  SupprimerGeofence(id:any){
    this.missionSer.deleteGeofence(id).subscribe(res=>{
      console.log(res);
    })
  }
visualiserGeofence(){
  this.adresscood();
  console.log(this.geofen);
  var geo=[];
  this.geofen.forEach(e => {
    geo.push([e.GeonfenceLat,e.GeonfenceLong])
  });
  console.log(this.dest.features[0].geometry.coordinates);
  (mapboxgl as any).accessToken = 'pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A';
    const map = new mapboxgl.Map({
        container: 'geofence2', // container ID
        style:'mapbox://styles/mapbox/streets-v11', // style URL
        center: this.dest.features[0].geometry.coordinates,
        zoom: 12
      });
      
      var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: { 
          polygon: true,
          trash: true 
        }
      });
      
      map.on('load', function () {
      
       // map.addControl(draw);
       console.log(geo);
       const myHeart = turf.polygon([
       geo
       ], {
         name: 'Oakland has heart.'
       });
       map.addSource('myHeart', {
        "type": "geojson",
        "data": myHeart
      });
     
      map.addLayer({
        "id": "myHeart",
        "type": "fill", // [fill, line, symbol, circle, heatmap, fill-extrusion, raster, hillshade, background]
        "source": "myHeart",
        'layout': {
    
        },
        'paint': {
          'fill-color': 'gold',
          'fill-opacity': 0.4,
        }
      });
   });
}
getGeofence(){
  this.missionSer.getGeofence(this.id).subscribe(res=>{
    console.log('geofence');
    console.log(res);
    this.geofen=res;
    if (this.geofen.length==0){
      this.disables=true;
    }
  })
}
adresscood(){
  console.log(this.adress)
  this.missionSer.addressLookup2(this.adress).subscribe(res=>{
    console.log(res);
    this.dest=res;
    console.log(this.dest.features[0].geometry.coordinates);
   
  })
}

}

