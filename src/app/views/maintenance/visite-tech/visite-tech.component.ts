import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { MaintenanceService } from '../MaintenanceServices.service';
import { ServiceVehiculeService } from '../../gestion/service-vehicule.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-visite-tech',
  templateUrl: './visite-tech.component.html',
  styleUrls: ['./visite-tech.component.css']
})
export class VisiteTechComponent implements OnInit {
visiteTech:any;

p : number=1;
val:any;
file:any;
  d:any;
  dateactuelle: any;
  selectedmonth: any;
  constructor(private route:Router,private maintenanace:MaintenanceService,private vser:ServiceVehiculeService) { }

  ngOnInit(): void {
    this.datenow()
    this.AllVisiteTechnique()
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
  
    selectmonth(e:any){
      this.selectedmonth =e.target.value
    this.maintenanace.getvisitemonth(this.selectedmonth).subscribe(res=>{
      this.visiteTech=res
    })
  }

  
  AllVisiteTechnique(){
  
    this.maintenanace.allvisiteTechnique().subscribe(res=>{
      this.visiteTech=res;
      console.log(this.visiteTech);
      
    })
  }

  updateVisiteTechnique(){
    console.log(this.d);
    const formData=new FormData();
    formData.append('id',this.d);
     formData.append('file',this.file);
    this.maintenanace.updateVisiteTechnique(formData).subscribe(res=>{
  console.log(res);
  this.AllVisiteTechnique();
    })
  }
  datenow(){
    this.maintenanace.getdatenow().subscribe(res=>{
      this.dateactuelle=res
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
