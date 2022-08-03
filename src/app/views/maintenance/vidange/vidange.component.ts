import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceVehiculeService } from '../../gestion/service-vehicule.service';
import { MaintenanceService } from '../MaintenanceServices.service';

@Component({
  selector: 'app-vidange',
  templateUrl: './vidange.component.html',
  styleUrls: ['./vidange.component.css']
})
export class VidangeComponent implements OnInit {
  vidange: any;
  p : number=1;
  val:any=0;
  d:any;
  file:any
  constructor(private route:Router,private maintenanace:MaintenanceService,private vser:ServiceVehiculeService) { }


  ngOnInit(): void {
    this.AllVidange();
  }
  

    getparam(id:any){
      this.d=id;
    }

  
  AllVidange(){
  
    this.maintenanace.allvidanges().subscribe(res=>{
      this.vidange=res;
      console.log(this.vidange);
      
    })
  }

  myForm:any=new FormGroup({
   
    file: new FormControl('', [Validators.required]),
  
  });
  get f(){
    return this.myForm.controls;
      }
  updatevidange(){
    const formData=new FormData();
    formData.append('id',this.d);
     formData.append('file',this.file);
    this.maintenanace.updatevidange(formData).subscribe(res=>{
  console.log(res);
  this.AllVidange();
    })
  }
  onSelectFile($event:Event) {

    // @ts-ignore
        this.file = $event.target.files[0];
       // console.log(this.files.name);
        
      }

  getVehiculeById(id:any){
    this.route.navigate(['gestion/detail-vehi/'+id])

  }

}
