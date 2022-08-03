import { Component, OnInit,ViewEncapsulation,ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { ChauffeurService } from '../../gestion/chauffeur.service';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule,AbstractControl, FormGroupName} from '@angular/forms';
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

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css',
  '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
  '../../../../scss/vendors/ng-select/ng-select.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AddMissionComponent implements AfterViewInit,OnInit{
 

  test1 :boolean;
  test2:boolean;
map:any;
  chauffeurs:any;
  vehicules:any;
  destinations:any;
  selectedChauff:any;
  selectedvehicule:any;
  selectdestination:any;
  dest:any;
  descriptionWikipedia:any;
  data:any;
  
  parcThabor = {
    
    lat: 36.85360770570492,
    lng: 10.196014351575807,
  };
 adress:any;
  // retrieve from https://gist.github.com/ThomasG77/61fa02b35abf4b971390
 smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });
  constructor(private fb: FormBuilder, private serv:ChauffeurService,private servehicule:ServiceVehiculeService,private missionSer:MissionsService,private router:Router) { }
  
  
  ngOnInit(): void {
    this.chauff();
    this.vehicule();
   // this.destination();

    this.test1= false;
    this.test2 = true;
    
    
  }
  ngAfterViewInit(): void {
    this.createMap();
  }

  myForm:any=new FormGroup({
    destination: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    arriveTime: new FormControl('', [Validators.required]),
    departTime: new FormControl('', [Validators.required]),
    user_id: new FormControl('', [Validators.required]),
    vehicule_id: new FormControl('', [Validators.required]),
    //adress: new FormControl('', [Validators.required]),
  });
  get f(){
    return this.myForm.controls;
      }
     
      test1click()
      {
        //this.test1= true ;
        this.test2=false;
      }
      
    
 ajouterMission(){
        console.log("aa");
        console.log(this.myForm);
        this.myForm.get('date').value= formatDate(this.myForm.get('date')?.value, 'YYYY/MM/dd', 'en');
        console.log(this.myForm.get('date').value);
        //this.myForm.get('arriveTime').value= formatDate(this.myForm.get('arriveTime')?.value, 'hh : mm a', 'en');
        //this.myForm.get('departTime').value= formatDate(this.myForm.get('departTime')?.value, 'hh : mm a', 'en');
        
        const formData=new FormData();
        formData.append('destination', this.myForm.get('destination')?.value);
        formData.append('longitude',this.parcThabor.lng.toString());
        formData.append('latitude',this.parcThabor.lat.toString());
        formData.append('date', this.myForm.get('date')?.value);
        formData.append('arriveTime', this.myForm.get('arriveTime')?.value);
        formData.append('departTime', this.myForm.get('departTime')?.value);
        formData.append('user_id', this.myForm.get('user_id')?.value);
        formData.append('vehicule_id', this.myForm.get('vehicule_id')?.value);
        console.log(this.parcThabor.lng.toString());
        
  //       this.missionSer.addMission(formData).subscribe(res=>{
  //         this.data=res;
  //         console.log(res);
  //         this.router.navigate(['mission/missions']);
  // });}
 }
   chauff(){
        this.serv.getChauffeursdispo().subscribe(
          res=>{
            console.log(res);
            this.chauffeurs=res;
            
          }
        );
  }
vehicule(){
    this.servehicule.getVehiculesdispo().subscribe(
      res=>{
        console.log(res);
        this.vehicules=res;
        
      }
    )
  }

// destination(){
//   this.missionSer.getdestination().subscribe(
//     res=>{
//       console.log(res);
//       this.destinations=res;
      
      
      
//     }
//   )

// }
  UpdateSelected(e:any){
    this.selectedChauff = e.target.value
    console.log(this.selectedChauff);
  }
  UpdateSelected2(e:any){
    this.selectedvehicule = e.target.value
    console.log(this.selectedvehicule);
   }

  // UpdateSelectedChauff(e:any){
  //   this.selectdestination = e.target.value
  //   console.log(this.selectdestination);
  //   console.log('test');
  //   this.missionSer.getDestinationByID(this.selectdestination).subscribe(
  //     res=>{
  //       console.log(res);
  //       this.dest=res;
  //       console.log('kkk');
  //       console.log(this.dest);
        
        
  //     }
  //   )
  // }
  Datepicker

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2025, 12, 30);

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

 
  
// Timepicker

public hstep: number = 1;
public mstep: number = 15;
public ismeridian: boolean = true;
public isEnabled: boolean = true;

public mytimeDep: Date = new Date();
public mytimeArr: Date = new Date();
public options: any = {
  hstep: [1, 2, 3],
  mstep: [1, 5, 10, 15, 25, 30]
};
public changedArr(): void {
  console.log('Time changed to: ' + this.mytimeArr);
}
public changedDep(): void {
  console.log('Time changed to: ' + this.mytimeDep);
}

public clear(): void {
  this.mytimeArr = void 0;
}
searchCoordonate(address: string){
  console.log('coord');
  console.log(address);
  this.missionSer.addressLookup(address).subscribe(res=>{
    //console.log(res);
    this.dest=res;
   console.log(this.dest);
    console.log(this.dest[0]);
    this.parcThabor.lat=this.dest[0].latitude;
    this.parcThabor.lng=this.dest[0].longitude;
    this.descriptionWikipedia=this.dest[0].displayName;
   // console.log(this.dest[0].latitude);
    console.log(this.parcThabor.lat);
    console.log(this.parcThabor.lng);
    console.log(address);
    this.map.remove();
    this.createMap();
    
  });
  /*this.missionSer.Coordonate('Tunisie').subscribe(
    res=>{
      console.log(res);
      
      
    }
  );*/
}

 createMap() {
 
  

  const zoomLevel = 12;

  this.map = L.map('map', {
    center: [this.parcThabor.lat, this.parcThabor.lng],
    
    zoom: zoomLevel
  });
  
  const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 12,
    maxZoom: 17,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  mainLayer.addTo(this.map);
 
  const popupOptions = {
    coords: this.parcThabor,
    text: this.descriptionWikipedia,
    open: true
  };
  this.addMarker(popupOptions);
}

addMarker({coords, text, open}) {
  const marker = L.marker([coords.lat, coords.lng], { icon: this.smallIcon });
  if (open) {
    marker.addTo(this.map).bindPopup(text).openPopup();
  } else {
    marker.addTo(this.map).bindPopup(text);
  }
}

}

 

