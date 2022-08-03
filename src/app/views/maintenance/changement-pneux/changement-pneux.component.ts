import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceVehiculeService } from '../../gestion/service-vehicule.service';
import { MaintenanceService } from '../MaintenanceServices.service';

@Component({
  selector: 'app-changement-pneux',
  templateUrl: './changement-pneux.component.html',
  styleUrls: ['./changement-pneux.component.css']
})
export class ChangementPneuxComponent implements OnInit {
  pneux: any;
  p : number=1;
  val:any=0;
  d:any;
  file:any
  allpneuxvehi: any="";
  constructor(private route:Router,private maintenanace:MaintenanceService,private vser:ServiceVehiculeService) { }


  ngOnInit(): void {
   this.allpneux()
  }
  getparam(id:any){
    this.d=id;
  }

  
  
  allpneux(){
    this.maintenanace.allpneux().subscribe(res=>{
      this.allpneuxvehi=res;
      console.log(this.allpneuxvehi);
      
    })
  }

  myForm:any=new FormGroup({
   
    file: new FormControl('', [Validators.required]),
  
  });
  get f(){
    return this.myForm.controls;
      }
  
  updateChangementPneux(){
    const formData=new FormData();
    formData.append('id',this.d);
     formData.append('file',this.file);
    this.maintenanace.updatepneux(formData).subscribe(res=>{
  console.log(res);
  this.allpneux();
    })
  }

  getVehiculeById(id:any){
    this.route.navigate(['gestion/detail-vehi/'+id])
  }
  onSelectFile($event:Event) {

    // @ts-ignore
        this.file = $event.target.files[0];
       // console.log(this.files.name);
        
      }
  
}
