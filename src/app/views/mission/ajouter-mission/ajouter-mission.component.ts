import { Component, OnInit,ViewEncapsulation,ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { ChauffeurService } from '../../gestion/chauffeur.service';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators,ValidatorFn, FormControl, ReactiveFormsModule,AbstractControl, FormGroupName} from '@angular/forms';
import {IOption} from 'ng-select';
import { ServiceVehiculeService } from '../../gestion/service-vehicule.service';
import{MissionsService}from '../MissionService.service';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import {icon, latLng, LeafletMouseEvent, Map, MapOptions, marker, tileLayer} from 'leaflet';
import * as $ from "jquery";
import { NominatimResponse } from '../../../model/nominatim.model';
import { MapPoint } from '../../../model/mapPoint.module';
import * as L from 'leaflet';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as moment from 'moment';
import * as turf from '@turf/turf'

@Component({
  selector: 'app-ajouter-mission',
  templateUrl: './ajouter-mission.component.html',
  styleUrls: ['./ajouter-mission.component.css',
  '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
  '../../../../scss/vendors/ng-select/ng-select.scss',
  '../../../../../node_modules/quill/dist/quill.snow.css'],
  encapsulation: ViewEncapsulation.None
})


export class AjouterMissionComponent implements AfterViewInit,OnInit {
  tempsArrive:any;
  dateval:any;
  tempsval:any;
  dataVal:any;
  parcCourd =[10.190972937,36.859938927];
  d1:any;
  d2:any;
  tempArr:any;
  map:mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  adress:any;
  destHiden:boolean; 
  content:any;

  test1 :boolean;
  test2:boolean;
  chauffeurs:any;
  vehicules:any;
  destinations:any;
  selectedChauff:any;
  selectedvehicule:any;
  selectdestination:any;
  dest:any;
  descriptionWikipedia:any;
  data:any;
  date1=formatDate(new Date(),'YYYY/MM/dd', 'en');
  user: any;
  distance: any;
  distancefinale: number;
  file:any
  affchaufvehi:boolean
  routes2: any;
  constructor(private fb: FormBuilder, private serv:ChauffeurService,private servehicule:ServiceVehiculeService,private missionSer:MissionsService,private router:Router) { }
  dateValidator(control: FormControl){
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isBefore(today)) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }
  
  egaliteValidator(control: FormControl){
    if (control.value) {
    
      if ((control.value.maxLength>8)) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }
  
  ngOnInit(): void {
   this.searcheCoordonate();
    //this.chauff();
   // this.vehicule();
    this.test2 = true;
    this.affchaufvehi=false
    const u :any =localStorage.getItem('user') ;
    this.user =JSON.parse(u);
   

    
  }
  
  searcheCoordonate(){

    var from = [36.864756339378715,10.163140922614268]
    this.test2=false;
    
    console.log(this.adress);
    this.missionSer.addressLookup2(this.adress).subscribe(
      res=>{
        console.log(res);
        this.dest=res;
        console.log(this.dest);
        const alt=this.dest.features[0].geometry.coordinates[0]
          const long=this.dest.features[0].geometry.coordinates[1]
          //console.log(long)
          //console.log(alt)
         this.distance = turf.distance([long,alt],from);
        this.distancefinale=(this.distance.toFixed(2))*2;
          console.log(this.distancefinale);
   
          this.missionSer.Routes(from[1],from[0],this.dest.features[0].geometry.coordinates).subscribe(res=>{
            
            this.routes2=res;
            console.log(this.routes2.routes[0].geometry.coordinates);
          });
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A';
    this.map= new mapboxgl.Map({
      container: 'map', // Specify the container ID
      style: 'mapbox://styles/mapbox/streets-v11', // Specify which map style to use
      center: [10.163140922614268,36.864756339378715], // Specify the starting position
      zoom: 7, // Specify the starting zoom
    });
    this.map.on('load', () => {
      const marker1 = new mapboxgl.Marker()
.setLngLat(this.dest.features[0].geometry.coordinates)
.addTo(this.map);
      this.map.addSource('route2', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': this.routes2.routes[0].geometry.coordinates
        
       
        }
        }
        });
        
  this.map.addLayer({
  'id': 'route2',
  'type': 'line',
  'source': 'route2',
  'layout': {
  'line-join': 'round',
  'line-cap': 'round'
  },
  'paint': {
  'line-color': '#f03b20',
  'line-width': 5
  }
  });
 
    
  });
  this.missionSer.TimeParcours(this.parcCourd[0],this.parcCourd[1],this.dest.features[0].geometry.coordinates[0],this.dest.features[0].geometry.coordinates[1]).subscribe(
    res=>{
      console.log(res);
      this.tempArr=res;
      this.tempArr=(this.tempArr.durations[1][0]+this.tempArr.durations[1][1])*2;
      console.log(this.tempArr);
    
    });
   });
   this.dateval=formatDate(this.dateval, 'YYYY-MM-dd', 'en');
   console.log(this.tempsval);
  // const dur='7200';
   const formData=new FormData();
         
   formData.append('d',this.dateval);
   formData.append('dur',this.tempArr);
   formData.append('td',this.tempsval);
   formData.append('distance',this.distancefinale.toString());

   //console.log(formData);
   this.missionSer.validateMission(formData).subscribe(
     res=> {
       console.log(res);
       
      this.dataVal=res;
      console.log(this.dataVal);
      this.chauffeurs=this.dataVal[0];
       this.vehicules=this.dataVal[1];
       this.tempsArrive=this.dataVal[3];
       console.log(this.tempsArrive);
       console.log(this.chauffeurs);
 
     });
     this.affchaufvehi=true

  }
  
  change(){
  }
  ngAfterViewInit(): void {
   
  }

  myForm:any=new FormGroup({
   
    date: new FormControl('', [Validators.required,this.dateValidator]),
   
    departTime: new FormControl('', [Validators.required]),
    user_id: new FormControl('', [Validators.required]),
    vehicule_id: new FormControl('', [Validators.required]),
    tel_Dest: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]),
    adress2: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    //rue:new FormControl('', [Validators.required]),
    description:new FormControl(''),
  
  });
  get f(){
    return this.myForm.controls;
      }
     

  
    
 ajouterMission(){
  
   
        console.log("aa");
        console.log(this.myForm);
        this.myForm.get('date').value= formatDate(this.myForm.get('date')?.value, 'YYYY/MM/dd', 'en');
        
      
        const formData=new FormData();
        
        formData.append('date', this.myForm.get('date')?.value);
        formData.append('duration',this.tempArr);
        formData.append('distanceparcouru',this.distancefinale.toString());
        formData.append('departTime', this.myForm.get('departTime')?.value);
        formData.append('user_id', this.myForm.get('user_id')?.value);
        formData.append('vehicule_id', this.myForm.get('vehicule_id')?.value);
        formData.append('adress', this.myForm.get('adress2')?.value);
        formData.append('file',this.file);
        formData.append('tel_Dest', this.myForm.get('tel_Dest')?.value);
        formData.append('description',this.myForm.get('description')?.value);

        const u :any =JSON.parse(localStorage.getItem('user')) ;
        
        this.missionSer.addMission(u.id,formData).subscribe(res=>{
          this.data=res;
          console.log(res);
          this.router.navigate(['mission/missions']);
  });}
 

  UpdateSelected(e:any){
    this.selectedChauff = e.target.value
    console.log(this.selectedChauff);
  }
  UpdateSelected2(e:any){
    this.selectedvehicule = e.target.value
    console.log(this.selectedvehicule);
   }
   onSelectFile($event:Event) {

    // @ts-ignore
        this.file= $event.target.files[0];
       // console.log(this.files.name);
        
      }
 
 


}

 



