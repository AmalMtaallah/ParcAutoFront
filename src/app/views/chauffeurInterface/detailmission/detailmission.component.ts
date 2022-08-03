import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { ChauffeurService } from '../../gestion/chauffeur.service';
import { MissionsService } from '../../mission/MissionService.service';
import * as turf from '@turf/turf'
import { ServiceVehiculeService } from '../../gestion/service-vehicule.service';
@Component({
  selector: 'app-detailmission',
  templateUrl: './detailmission.component.html',
  styleUrls: ['./detailmission.component.css']
})
export class DetailmissionComponent implements OnInit {
  id: any;
  map:any;
  parcCourd =[10.190972937,36.859938927];
  mission: any;
dest:any;
  directions: any;
  coordonates: any;
  duration:any;
  distance:any;
geofence:any=[];
vehicule:any;
dateactuelle: any;
afficherlancer: boolean=true
d:any
d2:any
afficherterminer: boolean=true;
missionTerminer: any="";
coordoné:any=""
distancefinale: string;
  constructor(private missionSer:MissionsService,private serv:ServiceVehiculeService,private router : ActivatedRoute) { }

  ngOnInit(): void {
   
    this.id = this.router.snapshot.params.id;
    
    this.getgeofence();
    this.getmission();
    this.getdate()
   //this.maps();
  }
  getparam(idd:any){
    this.d=idd;
  }

   lancer(idd:any){
    this.missionSer.lancer(idd).subscribe( res=>{
     this.afficherterminer=false
     this.afficherlancer=true
    });
  }
  public getdate(){
    this.missionSer.getdatenow().subscribe( res=>{
      this.dateactuelle=res;
      console.log(this.mission.date)
      console.log(this.dateactuelle)
      if(this.mission.date==this.dateactuelle && this.mission.etat=="En attente"){
        this.afficherlancer=false
      }
      else{
        this.afficherlancer=true
      }
    });
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
  this.afficherlancer=true
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
  getmission(){
    this.missionSer.getMissionByID(this.id).subscribe( res=>{
      console.log(res);
       this.mission=res;
       this.getvehicule();
      this.maps();

      });
     
  }
maps(){
  this.missionSer.addressLookup2(this.mission.adress).subscribe(
    res=>{
      //console.log(res);
      this.dest=res;
      console.log(this.dest);
    });
 
  (mapboxgl as any).accessToken = 'pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A';
  this.map= new mapboxgl.Map({
    container: 'map', // Specify the container ID
    style: 'mapbox://styles/mapbox/streets-v11', // Specify which map style to use
  //  center: this.dest.features[0].geometry.coordinates, // Specify the starting position
    zoom: 12, // Specify the starting zoom
  });


  this.map.on('load', async () => {

    this.map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })
      );
    this.map.jumpTo({ 'center': this.dest.features[0].geometry.coordinates, 'zoom': 6 });
  
  const marker1 = new mapboxgl.Marker()
.setLngLat(this.dest.features[0].geometry.coordinates)
.addTo(this.map);
this.missionSer.TimeParcours(this.parcCourd[0],this.parcCourd[1],this.dest.features[0].geometry.coordinates[0],this.dest.features[0].geometry.coordinates[1]).subscribe(
  res=>{
    console.log('time'+res);
    
  
  });
 

 //console.log('dest '+this.dest.features[0].geometry.coordinates[0]+ 'dest '+this.dest.features[0].geometry.coordinates[1]);
  this.missionSer.matching(this.parcCourd[0],this.parcCourd[1]  , this.dest.features[0].geometry.coordinates[0],this.dest.features[0].geometry.coordinates[1]).subscribe(res=>{
    console.log('direction');
    console.log(res);
    this.directions=res;
  // console.log(this.directions.routes[0].geometry.coordinates);
  this.coordonates=this.directions.routes[0].geometry.coordinates;
  this.duration=this.directions.routes[0].duration;
  this.distance=this.directions.routes[0].distance;
   console.log(this.distance);
  
    var d = Math.floor(this.duration / (3600*24));
    var h = Math.floor(this.duration % (3600*24) / 3600);
    var m = Math.floor(this.duration % 3600 / 60);
    var s = Math.floor(this.duration % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : "") : "";
    this.duration=hDisplay+':'+mDisplay+':'+sDisplay;
    this.distance=this.distance/1000;
   console.log(this.distance);
   //console.log(this.coordonates[1]);
   this.map.addSource('route', {
    'type': 'geojson',
    'data': {
    'type': 'Feature',
    'properties': {},
    'geometry': {
    'type': 'LineString',
    'coordinates': this.coordonates
  }
}
});
this.map.addLayer({
'id': 'route',
'type': 'line',
'source': 'route',
'layout': {
'line-join': 'round',
'line-cap': 'round'
},
'paint': {
'line-color': '#888',
'line-width': 8
}
});
  });

  console.log(this.coordonates);
  console.log('myheart');
  if(this.geofence.length!=0){
  const json = 
{
    "type": "geojson",
    "data": 
        {
         "type": "FeatureCollection",
         "features": [{
               "type": "Feature",
               "geometry": {
                   "type": "Polygon",
                   "coordinates": [this.geofence]
                }
            }]
       }
 }
 
  const myHeart = turf.polygon(json.data.features[0].geometry.coordinates , { name: 'poly1', population: 400});
 /*const myHeart = turf.polygon(this.geofence, {
     name: 'Oakland has heart.'
   });*/
   console.log(myHeart);
 this.map.addSource('myHeart', {
    "type": "geojson",
    "data": myHeart
  });

  this.map.addLayer({
    "id": "myHeart",
    "type": "fill", // [fill, line, symbol, circle, heatmap, fill-extrusion, raster, hillshade, background]
    "source": "myHeart",
    'layout': {

    },
    'paint': {
      'fill-color': 'red',
      'fill-opacity': 0.8
    }
  });
} 
});
  
    }
  
getgeofence(){
  let cood=[];
  this.missionSer.getGeofence(this.id).subscribe(res=>{
    console.log('geofence');
   // console.log(res);
   
    res.forEach(e => {
      cood=[e.GeonfenceLat,e.GeonfenceLong];
      this.geofence.push(cood);
     
      
    });
   console.log(this.geofence);
  })
}
 
getvehicule(){
this.serv.getVehiculeByID(this.mission.vehicule_id).subscribe(res=>{
  this.vehicule=res;
  console.log(this.vehicule);
})
}

}



