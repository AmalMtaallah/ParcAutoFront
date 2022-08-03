import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceVehiculeService } from '../../gestion/service-vehicule.service';
import { MaintenanceService } from '../MaintenanceServices.service';
@Component({
  selector: 'app-assurance',
  templateUrl: './assurance.component.html',
  styleUrls: ['./assurance.component.css']
})
export class AssuranceComponent implements OnInit {
  p : number=1;
assurance:any;
d:any;
val:any;
  dateactuelle: any;
  file:any;
  imagedirectory :any ='http://127.0.0.1:8000/public/vidange/';
  selectedmonth: any;
  assuranceexpire: any;
  constructor(private route:Router,private vser:ServiceVehiculeService,private maintenanace:MaintenanceService) { }

  ngOnInit(): void {
    this.AllAssurance()
  this.datenow()

  }
  
  
  myForm:any=new FormGroup({
   
    file: new FormControl('', [Validators.required]),
  
  });
  get f(){
    return this.myForm.controls;
      }
  getparam(id:any){
    this.d=id;
  }
AllAssurance(){
  this.maintenanace.getallAssurances().subscribe(res=>{
    this.assurance=res;
    console.log(this.assurance);
    
  })
}

datenow(){
  this.maintenanace.getdatenow().subscribe(res=>{
    this.dateactuelle=res
  })
}

AssuranceUpdate(){
  console.log(this.d);
  const formData=new FormData();
  formData.append('id',this.d);
   formData.append('file',this.file);
  this.maintenanace.updateAssurance(formData).subscribe(res=>{
console.log(res);
this.AllAssurance();

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
selectmonth(e:any){
  this.selectedmonth =e.target.value
this.maintenanace.getassurancesbymotnh(this.selectedmonth).subscribe(res=>{
  this.assurance=res
  console.log(this.assuranceexpire)
})
}
}
