import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { MissionsService } from '../mission/MissionService.service';
import * as turf from '@turf/turf'
import { Router } from '@angular/router';
//import { timeStamp } from 'console';
@Component({
  selector: 'app-root',
  templateUrl: 'google-maps.component.html',
  styleUrls: ['google-maps.component.css'],
})

export class GoogleMapsComponent implements OnInit {
  constructor(private serv:MissionsService,private router:Router){}
  map:mapboxgl.Map;
  p : number=1;
  mission:any;
 response:any[]=[]
  data:any[]=[]
  coords:any[]=[];
  markers:any[]=[];
  lat:any[]=[];
  long:any[]=[];


 // 
//csvToRowArray:any
  ngOnInit(): void {
this.missionEncour()
//this.test()
}


public missionEncour(){
  this.serv.AllMissionEnCours().subscribe(res=>{
    console.log(res)
    this.mission=res
   console.log(this.mission.vehicule)
  })  
}

public liveCart(id:any){

    this.router.navigate(['mission/liveCart/'+id])
  
}
/*public amal(){
  (mapboxgl as any).accessToken = 'pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A';
  const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/satellite-v9', // style URL
  zoom: 7, // starting zoom
  center: [138.043, 35.201] // starting center
  });
   
  map.on('load', () => {
  map.addSource('earthquakes', {
  type: 'geojson',
  // Use a URL for the value for the `data` property.
  data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
  });
   
  map.addLayer({
  'id': 'earthquakes-layer',
  'type': 'circle',
  'source': 'earthquakes',
  'paint': {
  'circle-radius': 8,
  'circle-stroke-width': 2,
  'circle-color': 'red',
  'circle-stroke-color': 'white'
  }
  });
  });
}*/
  /*public test(){
   
this.serv.vehiculelivecart().subscribe(res=>{
  this.livevehi=res
  console.log(this.livevehi.length)

  for(let z=0;z<this.livevehi.length;z++){
    console.log(this.livevehi[z])
  }
})
  }*/
  /*public dali(){

   (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZGFsaXRyMDEiLCJhIjoiY2wwdXZvYzdlMHhrYjNqbjVhNDA1MjFsMyJ9.aF1hBdWYO5xns9ID8VdmSA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 0
    });
   
  
    
    map.on('load', async () => {
        // We fetch the JSON here so that we can parse and use it separately
        // from GL JS's use in the added source.
          
    this.serv.vehiculelivecart().subscribe(async res=>{
  this.livevehi=res
 console.log(this.livevehi)

  // for(let z=0;z<this.livevehi.length;z++){
  //   console.log(this.livevehi[z])
  // }
  for(let nbvehicule=0 ;nbvehicule<this.livevehi.length;nbvehicule++){
    this.response.push(await fetch(
      //https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson'     
      '../../../../assets/0.geojson'
  ))  
}
for (let nb=0;nb<this.response.length;nb++){
  this.data.push(await this.response[nb].json())
  //console.log(this.data)
}
    for (let y=0;y<this.data.length;y++){
          this.coords.push(this.data[y].features[0].geometry.coordinates)
         // console.log(this.coords[y])
        }
    for(let e=0;e<this.livevehi.length;e++){

      this.markers.push(new mapboxgl.Marker({
      }),
      //console.log(this.markers.length)

      )

      for(let a=0;a<this.data.length;a++){
        for(let b=0;b<this.coords.length;b++){
          this.data[a].features[0].geometry.coordinates=[this.coords[e][0]]
         

        map.addSource('route',{ type: 'geojson', data: this.data[e] });
        map.addLayer({
        'id': 'route',
        'source': 'route',
        'type': 'line',
        'paint': {
        'line-width': 2,
        'line-color': '#007cbf'
        }
        });
        map.jumpTo({ 'center': this.coords[e][0], 'zoom': 14 });
        //console.log(this.coords[b][0])
        

      
      let i = 0;

      const timer = setInterval(() => {
      if(this.coords[e][i]==[]){
        console.log("test ")
      }
      if (i < this.coords[e].length) {
        
            this.data[e].features[0].geometry.coordinates.push(this.coords[e][i]);
            for(let mr=0;mr<this.markers.length;mr++){
             // console.log(this.markers[mr])
              
            
            //data2.features[0].geometry.coordinates.push(coordinates[i+1000]);
            this.markers[mr].remove()
          //  console.log('dali'+coordinates[i])
      const source= map.getSource('route')as mapboxgl.GeoJSONSource
            source.setData(this.data[e]);
            
            
            this.markers[mr].setLngLat(this.coords[e][i]).addTo(map);
           
            //console.log(this.coords[e][i])
          this.markers[mr].setPopup(
                new mapboxgl.Popup({closeOnClick: false, closeButton: false}
                  ) // add popups
                .setHTML(
                  // this.livevehi[0].marque +" "+
                  // this.livevehi[0].matricule + ' '+
                  // this.livevehi[0].name
                  this.livevehi[e].marque +" "+
                  this.livevehi[e].matricule +" "+
                  this.livevehi[e].name                  
                  )
                .setLngLat(this.coords[e][i])
                .addTo(map)        
            )
        
        /*   if(index !=null){
              console.log("testtt");
              console.log("testtt");
              

            } 
         console.log(this.coords[e][i]);
           i++;
            if(i==10){
              this.serv.sendSmsNotificaition(this.livevehi[e].matricule,this.livevehi[e].name).subscribe(res=>{  
            console.log(res)
              })
              console.log('ebaath aad')

            }


                }
      }
        else {
          window.clearInterval(timer);
      }
  },1000);
}
      }
    }


})




   

})
  
 
// public dali(){
//   this.serv.vehiculelivecart().subscribe(res=>{
//   this.livevehi=res
//   //console.log(this.livevehi[0].marque)
  
//       mapboxgl.accessToken = 'pk.eyJ1IjoiZGFsaXRyMDEiLCJhIjoiY2wwdXZvYzdlMHhrYjNqbjVhNDA1MjFsMyJ9.aF1hBdWYO5xns9ID8VdmSA';
//       const map = new mapboxgl.Map({
//           container: 'map',
//           style: 'mapbox://styles/mapbox/streets-v11',
//           zoom: 0
//       });
     
    
      
//       map.on('load', async () => {
//           // We fetch the JSON here so that we can parse and use it separately
//           // from GL JS's use in the added source.
//        for(let nbvehicule=0;nbvehicule<this.livevehi.length;nbvehicule++){
//          this.response.push(await fetch(
//                 //'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson'     
//                 '../../../../assets/'+nbvehicule+'.geojson'
//             ))     
//           }
//           for(let resp=0;resp<this.response.length;resp++){
//             this.data.push(await this.response[resp].json())

//           }

//           for(let d=0;d<this.data.length;d++){
//             this.coords.push(this.data[d].features[0].geometry.coordinates)
//           }

//           for(let c=0;c<this.coords.length;c++){
//             for(let d=0;d<this.data.length;d++){
//               this.data[d].features[0].geometry.coordinates = [this.coords[c][0]];
//             }
//           }
//           for(let nbvehicule=0;nbvehicule<this.livevehi.length;nbvehicule++){
//             for(let d=0;d<this.data.length;d++){
//           map.addSource('route'+nbvehicule,{ type: 'geojson', data: this.data[d] });
//           map.addLayer({
//           'id': 'route'+nbvehicule,
//           'source': 'route'+nbvehicule,
//           'type': 'line',
//           'paint': {
//           'line-width': 2,
//           'line-color': '#007cbf'
//           }
//           });
        
//         }
//         for(let c=0;c<this.coords.length;c++){

//         map.jumpTo({ 'center': this.coords[c][0], 'zoom': 14 });
//         map.setPitch(30);
//       }
//       this.markers.push(new mapboxgl.Marker({
//       }))
//       let i=0
//       const timer = setInterval(() => {
//         for(let c=0;c<this.coords.length;c++){
//         if (i < this.coords[c].length) {
//           for(let d=0;d<this.data.length;d++){
//             this.data[d].features[0].geometry.coordinates.push(this.coords[c][i]);
//             //data2.features[0].geometry.coordinates.push(coordinates[i+1000]);
//             for(let mk=0;mk<this.markers.length;mk++){

//             this.markers[mk].remove()
//           //  console.log('dali'+coordinates[i])
//             map.getSource('route'+nbvehicule).setData(this.data[d]);
//             this.markers[mk].setLngLat(this.coords[c][i]).addTo(map);
//             this.markers[mk].setPopup(
//                 new mapboxgl.Popup({closeOnClick: false, closeButton: false}
//                   ) // add popups
//                 .setHTML(
//                   this.livevehi[0].marque +" "+
//                   this.livevehi[0].matricule + ' '+
//                   this.livevehi[0].name
//                   )
//                 .setLngLat(this.coords[c][i]))
//                 .addTo(map)        
            
//             i++;
//         } 
          
//       }
//     }  
      
//         else {
//           window.clearInterval(timer);
//       }

      
    
        
//   }
// },10);
// }
// });
// })
// }
}*/
    
    
    


          // const response = await fetch(
          //     'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson'     
          //     //'../../../../assets/india_states.geojson'
          // );
          // const response2 = await fetch(
          //   //'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson'     
          //             '../../../../assets/stations.geojson'
          //   );
          //const data = ;
          //const data2=await response2.json()
          // save full coordinate list for later
         // const coordinates = data.features[0].geometry.coordinates;  
          //const coordinates2 = data2.features[0].geometry.coordinates;  
  
          // start by showing just the first coordinate
         // data.features[0].geometry.coordinates = [coordinates[0]];
          //data2.features[0].geometry.coordinates = [coordinates2[0]];
  
         // data2.features[0].geometry.coordinates = [coordinates[1000]];
  
          // add it to the map
             
            // map.addSource('point' ,{
            //   type: 'geojson',
            //   data: {
            //     type: 'Feature',
            //     properties: {},
            //     geometry: {
            //       type: 'LineString',
            //       coordinates: data
            //     }
            //   }
            // });
           
            // map.addSource('route2',{ type: 'geojson', data: data2 });
  
            // map.addLayer({
            // 'id': 'route2',
            // 'source': 'route2',
            // 'type': 'line',
            // 'paint': {
            // 'line-width': 2,
            // 'line-color': 'red'
            // }
            // });
           
           
         // map.jumpTo({ 'center': coordinates2[0], 'zoom': 14 });
  
    
          // on a regular basis, add more coordinates from the saved list and update the map
          // let i = 0;
          // let j=0
          // const marker1 = new mapboxgl.Marker({
          //   });
          //   const marker2= new mapboxgl.Marker({
          //   });
          
            //       if(j<coordinates2.length){
            //         marker2.remove()
  
            //         data2.features[0].geometry.coordinates.push(coordinates2[j]);
  
            //         map.getSource('route2').setData(data2);
            //         marker2.setLngLat(coordinates2[j]).addTo(map);
            //         marker2.setPopup(
            //             new mapboxgl.Popup({closeOnClick: false, closeButton: false}
            //               ) // add popups
            //             .setHTML(
            //           'Véhicule 5'
            //             )
            //             .setLngLat(coordinates2[j])
            //             .addTo(map)        
            //         )
            //         j++;
  
                      
            
                
            //  //map.panTo(coordinates[i]);
            //             }
                 
 
        
        
       


        
               // const response2 = await fetch(
          //'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson'     
                //    '../../../../assets/1.geojson'
         // );
        //const data2=await response2.json()
        // save full coordinate list for later
        //const coordinates = data.features[0].geometry.coordinates;  
        //const coordinates2 = data2.features[0].geometry.coordinates;  

        // start by showing just the first coordinate
        //data.features[0].geometry.coordinates = [coordinates[0]];
        //data2.features[0].geometry.coordinates = [coordinates2[0]];

       // data2.features[0].geometry.coordinates = [coordinates[1000]];

        // add it to the map
           
          // map.addSource('point' ,{
          //   type: 'geojson',
          //   data: {
          //     type: 'Feature',
          //     properties: {},
          //     geometry: {
          //       type: 'LineString',
          //       coordinates: data
          //     }
          //   }
          // });
        
         
         
          // map.addSource('route2',{ type: 'geojson', data: data2 });

          // map.addLayer({
          // 'id': 'route2',
          // 'source': 'route2',
          // 'type': 'line',
          // 'paint': {
          // 'line-width': 2,
          // 'line-color': 'red'
          // }
          // });
         
         

       // map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
        //map.setPitch(30);
  
        // on a regular basis, add more coordinates from the saved list and update the map
        // let j=0
        // let l=this.livevehi.length
        
       
        //   const marker2= new mapboxgl.Marker({
        //   });
        
                // if(j<coordinates2.length){
  //               //   marker2.remove()

  //               //   data2.features[0].geometry.coordinates.push(coordinates2[j]);

  //               //   map.getSource('route2').setData(data2);
  //               //   marker2.setLngLat(coordinates2[j]).addTo(map);
  //               //   marker2.setPopup(
  //               //       new mapboxgl.Popup({closeOnClick: false, closeButton: false}
  //               //         ) // add popups
  //               //       .setHTML(
  //               //     'Véhicule 5'
  //               //       )
  //               //       .setLngLat(coordinates2[j])
  //               //       .addTo(map)        
  //               //   )
  //               //   j++;

                    
          
              
  //          //map.panTo(coordinates[i]);
  }
