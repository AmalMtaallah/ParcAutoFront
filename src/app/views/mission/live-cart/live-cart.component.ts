
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { HttpClient } from "@angular/common/http";
import{MissionsService}from '../MissionService.service';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
//import { Socket } from 'ngx-socket-io';
import * as turf from '@turf/turf'
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../google-maps/service';
@Component({
  selector: 'app-live-cart',
  templateUrl: './live-cart.component.html',
  styleUrls: ['./live-cart.component.css']
})

export class LiveCartComponent implements OnInit {
  map: any;
  coordonates: any[]=[];
  directions:any;
  options = {
    steps: 20,
    units: "kilometers",
 };
  outCircle: any[]=[];
  polygons :any[]=[
    [-122.019807, 45.632433],
   [-122.019767, 45.632453],
   [-122.01971, 45.632472],
   [-122.019739, 45.632531],
   [-122.019781, 45.632549],
  ]
  polygon:any;
  data: any=[];
  data3:any;
  d:any=[];
  lat:any=[];
  lng:any=[];
  response: any=[];
  coords:any=[];
  coordinates:any=[] ;
 id:any;
 mission:any;
 distance:any;
  cood: any;
  constructor(private appState: AppState,private http: HttpClient,private missionSer:MissionsService,private router : ActivatedRoute) { this.cood= this.appState.mylist;}

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    console.log('id'+this.id);
    //this.missionTrack();

 this.map2();
    //this.convertCSV();
    console.log(  this.distance);
  }

      map2(){
        this.distance=0
        this.missionSer.matching( -78.5008432, 38.0313705   , -78.5016022, 38.0321501 ).subscribe(res=>{
          console.log(res);
          this.directions=res;
         console.log(this.directions.routes[0].geometry.coordinates);
         this.coordonates=this.directions.routes[0].geometry.coordinates;
         //console.log(this.coordonates);
         console.log(this.coordonates);
         console.log(this.coordonates[1]);
            
        });
      this.missionSer.vehiculeTraking(this.id).subscribe( res=>{
        this.mission=res;
       
         //console.log(this.mission);
 
    ( mapboxgl as any).accessToken = 'pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A';
     const map = new mapboxgl.Map({
     container: 'map',
     style: 'mapbox://styles/mapbox/streets-v11',
     zoom: 0
     });
      
     map.on('load', async () => {
     
     // We fetch the JSON here so that we can parse and use it separately
     // from GL JS's use in the added source.
     console.log("Mission");
     console.log(this.mission[0].vehicule_id);
     const response = await fetch(
      '../../../../assets/'+this.id+'.geojson'
     //'../../../../assets/5.geojson'

     );
     const data = await response.json();
     
     // save full coordinate list for later
     var coordinates=[] ;
     //data.features.forEach(e => {
       //coordinates.push(+)
       console.log(data.features[0].properties.Longitude)
       
     //});
     for(let i=0;i<data.features.length;i++){
       coordinates.push([data.features[i].properties.Longitude,data.features[i].properties.Latitude])
     }
     console.log(coordinates);
    //coordinates= data.features[0].geometry.coordinates;
      //console.log(coordinates)
     // start by showing just the first coordinate
     data.features[0].geometry.coordinates = [coordinates[0]];
     const myHeart = turf.polygon([
      [
       [-78.5008432, 38.0313705 ],
       [-78.5016022, 38.0321501],
       [-78.5009312, 38.0323163],
       [-78.5005792, 38.0319718 ],
      
      // [-122.014576, 45.642963],
      // [-122.01456, 45.642914],
      // [-122.014651, 45.642837],
       [-78.5008432, 38.0313705],
      ]
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
        'fill-color': 'red',
        'fill-opacity': 0.8
      }
    });

    map.addSource('route2', {
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
      map.addLayer({
      'id': 'route2',
      'type': 'line',
      'source': 'route2',
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': '#888',
      'line-width': 8
      }
      });
   
     // add it to the map
     map.addSource('trace', { type: 'geojson', data: data });
     
     map.addLayer({
     'id': 'trace',
     'type': 'line',
     'source': 'trace',
     'paint': {
     'line-color': 'yellow',
     'line-opacity': 0.75,
     'line-width': 5
     }
     });
    
     // setup the viewport
     map.jumpTo({ 'center': coordinates[this.cood], 'zoom': 14 });
     map.setPitch(30);
     
     // on a regular basis, add more coordinates from the saved list and update the map
     let i=0;
     if(this.cood<coordinates.length){
      i = this.cood;
     }else{
       i=coordinates.length-1
     }
     
     let j=0;
     let s=0;
     let t=0;
     let c=0;
     console.log( this.cood)
     const marker1 = new mapboxgl.Marker({
     });
     const timer = setInterval(() => {
       
      console.log(coordinates[this.cood])
     if (i < coordinates.length ) {
      
       data.features[i].geometry.coordinates.push(coordinates[i]);
       marker1.remove()
    // console.log(data)
     
     
    // map.getSource('route').setData(this.data[e]);
    map.getSource('trace').setData(data);
   marker1.setLngLat(coordinates[i]).addTo(map);
     marker1.setPopup(
      new mapboxgl.Popup({closeOnClick: false, closeButton: false}
        ) // add popups
      .setHTML(
        // this.livevehi[0].marque +" "+
        // this.livevehi[0].matricule + ' '+
        // this.livevehi[0].name
        "Matricule :"+this.mission[0].vehicule.matricule +" "+
        "Chauffeur :"+this.mission[0].user.name +" "
                         
      ).setLngLat(coordinates[i])
      .addTo(map))


/*this.distance=this.distance+Number(((data.features[0].properties.Attributes).split(' ')[2]).substr(9, 4));
//console.log(this.distance)


 if(t<data.features.length){
  if(Number((data.features[i].properties.temperature))>90){
  const msg='Température éleveé: '+this.mission[0].vehicule.matricule+" conduit par le chauffeur  : "+this.mission[0].user.name;
        console.log(msg);
        this.missionSer.envoiealerte2(msg).subscribe(res=>{
          console.log(res)
        })
         t=data.features.length;
      }
      t++;
}
if(c<data.features.length){
  if(Number((data.features[i].properties.carburant))<15){
  const msg='Diminution carburants : '+this.mission[0].vehicule.matricule+" conduit par le chauffeur  : "+this.mission[0].user.name;
        console.log(msg);
        this.missionSer.envoiealerte2(msg).subscribe(res=>{
          console.log(res)
        })
        c=data.features.length;
      }
      c++;
}


  if( s<data.features.length){
      if((Number((data.features[i].properties.Speed).substr(0,3)))>110){
      
        const msg='Vitesse élevée: '+this.mission[0].vehicule.matricule+" conduit par le chauffeur  : "+this.mission[0].user.name;
        console.log(msg);
        this.missionSer.envoiealerte2(msg).subscribe(res=>{
          console.log(res)
        })
      
         s=data.features.length;
        }
        s++;

    }
       if (j < coordinates.length) {
        var pt = turf.point(coordinates[i]);
        var line = turf.lineString(this.coordonates);
        var isPointOnLine = turf.booleanPointOnLine(pt, line);
       console.log(isPointOnLine);
        if(isPointOnLine===false){
          const msg='Hors route: '+this.mission[0].vehicule.matricule+" conduit par le chauffeur  : "+this.mission[0].user.name;
          console.log("outside Route");
           /*  this.missionSer.SendSMS(msg).subscribe(res=>{
           console.log(res);
         });*/
         /*this.missionSer.envoiealerte2(msg).subscribe(res=>{
          console.log(res)
        })
         console.log(msg);
        }

       
         var markerWithin = turf.pointsWithinPolygon(pt, myHeart);
        console.log(markerWithin.features.length);
      if(markerWithin.features.length===0){
       
         //const msg="outside";
        const msg='Hors géofence: '+this.mission[0].vehicule.matricule+" conduit par le chauffeur  : "+this.mission[0].user.name;
        this.missionSer.envoiealerte2(msg).subscribe(res=>{
          console.log(res)
        })
        console.log(msg);*/
    
        /*  this.missionSer.SendSMS(msg).subscribe(res=>{
           console.log(res);
         });*/
        


        
       /* j=coordinates.length;
        }
        j++;
      }
     this.distance=data.features[i].properties.Attributes*/
     map.panTo(coordinates[i]);
     i++;
     }
     else {
      
     window.clearInterval(timer);
     }

     }, 1000);
    
     });
      
     console.log(this.distance);
    
      });
     

    }
  
  }