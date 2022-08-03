import { Component, OnInit,ViewEncapsulation,ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { ChauffeurService } from '../../gestion/chauffeur.service';
import { Router ,ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, Validators,ValidatorFn, FormControl, ReactiveFormsModule,AbstractControl, FormGroupName} from '@angular/forms';
import {IOption} from 'ng-select';
import { ServiceVehiculeService } from '../../gestion/service-vehicule.service';
import{MissionsService}from '../MissionService.service';
//import { DatePipe } from '@angular/common';
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

@Component({
  selector: 'app-edit-mission',
  templateUrl: './edit-mission.component.html',
  styleUrls: ['./edit-mission.component.css',
  '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
  '../../../../scss/vendors/ng-select/ng-select.scss',
  '../../../../../node_modules/quill/dist/quill.snow.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditMissionComponent implements OnInit {

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
  id: any="";
  m: any;
  mission: any;
  chauffeur: any;
  vehicule: any;
  //myForm: FormGroup;
 
  constructor(private route : ActivatedRoute,private fb: FormBuilder, private serv:ChauffeurService,private servehicule:ServiceVehiculeService,private missionSer:MissionsService,private router:Router) { }
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
   
    
    this.test2 = true;
    this.id = this.route.snapshot.params['id'];
    
    this.missionSer.getMissionByID(this.id).subscribe(data=>{

      this.mission =data;
      this.selectedChauff=this.mission.user_id;
      this.selectedvehicule=this.mission.vehicule_id
   this.getnomchauffeur(this.selectedChauff)
this.getvehicule(this.selectedvehicule)
  });
    
  }
  getvehicule(id){
    this.servehicule.getVehiculeByID(id).subscribe(res=>{
      this.vehicule=res
    })
  }
  getnomchauffeur(id){
    this.serv.getChauffByID(id).subscribe(res=>{
      this.chauffeur=res
    })
  }
  
searcheCoordonate(){
    console .log(this.mission.adress);
    console .log(this.mission.date);
    this.test2=false;
    
    this.missionSer.addressLookup2(this.mission.adress).subscribe(
      res=>{
        this.dest=res;
   
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A';
    this.map= new mapboxgl.Map({
      container: 'map', // Specify the container ID
      style: 'mapbox://styles/mapbox/streets-v11', // Specify which map style to use
      center: this.dest.features[0].geometry.coordinates, // Specify the starting position
      zoom: 12, // Specify the starting zoom
    });
    const marker1 = new mapboxgl.Marker()
.setLngLat(this.dest.features[0].geometry.coordinates)
.addTo(this.map);
  this.missionSer.TimeParcours(this.parcCourd[0],this.parcCourd[1],this.dest.features[0].geometry.coordinates[0],this.dest.features[0].geometry.coordinates[1]).subscribe(
    res=>{
      this.tempArr=res;
      this.tempArr=this.tempArr.durations[1][0]+this.tempArr.durations[1][1];
     console.log(this.tempArr);
    
    });
   });
this.dateval=formatDate(this.mission.date, 'YYYY-MM-dd', 'en');
   console.log(this.mission.departTime);
  const dur='7200';
   const formData=new FormData();
         
   formData.append('d',this.dateval);
   formData.append('dur',this.tempArr);
   formData.append('td',this.mission.departTime);
   console.log(formData);
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
  }
 
  ngAfterViewInit(): void {
   
  }
  myForm:any=new FormGroup({
   
    date: new FormControl('', [this.dateValidator]),
   
    departTime: new FormControl(''),
    user_id: new FormControl(''),
    vehicule_id: new FormControl(''),
    tel_Dest: new FormControl('', [Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]),
    adress2: new FormControl(''),
    chargement: new FormControl(''),
    description:new FormControl(''),
  
  });
  
  get f(){
    return this.myForm.controls;
      }
     

  
    
UpdateMission(){
this.id = this.route.snapshot.params.id;
   
       console.log(this.id);
        console.log(this.myForm);
        this.mission.date= formatDate(this.mission.date, 'YYYY/MM/dd', 'en');
      
    
        const formData=new FormData();
        
        formData.append('date', this.mission.date);
        formData.append('duration',this.tempArr);
        formData.append('departTime', this.mission.departTime);
        formData.append('user_id', this.mission.user_id);
        formData.append('vehicule_id', this.mission.vehicule_id);
        formData.append('adress', this.mission.adress);
        formData.append('chargement',this.mission.chargement);
        formData.append('tel_Dest', this.mission.tel_Dest);
        formData.append('description',this.mission.description);

       
        
        this.missionSer.updateMission(this.id,formData).subscribe(res=>{
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

 


}
