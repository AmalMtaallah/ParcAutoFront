import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChauffeurService } from '../chauffeur.service';
import { ServiceVehiculeService } from '../service-vehicule.service';

@Component({
  selector: 'app-addvehicule',
  templateUrl: './addvehicule.component.html',
  styleUrls: ['./addvehicule.component.css']
})
export class AddvehiculeComponent implements OnInit {
  data:any;
  alert:boolean=false;
  message?:any;
  status:any;
  files:any;
  f1:boolean
  f2:boolean=true
  id:any
  chauffeurs:any
  chauff:any
  usedMatricule: boolean;
  usedmatriculemsg: any;
  constructor(private router:Router,private serv:ServiceVehiculeService,private chaufserv:ChauffeurService) { }
  user:any;
  ngOnInit(): void {
    this.f1=false
    this.getchauffeurs()
  }
  myForm:any=new FormGroup({
    marque: new FormControl('', [Validators.required]),
    modele: new FormControl('', [Validators.required]),
    matricule: new FormControl('', [Validators.required]),
    couleur: new FormControl('', [Validators.required]),
    puissance: new FormControl('', [Validators.required]),
    datepremiere: new FormControl('', [Validators.required]),
    dateentre: new FormControl('', [Validators.required]),
    consomation_moy: new FormControl('', [Validators.required]),
    energie: new FormControl('', [Validators.required]),
    maxreservoire: new FormControl('', [Validators.required]),
    dernierVisiteTechnique: new FormControl('', [Validators.required]),
    dernierAssurace: new FormControl('', [Validators.required]),
    });
  get f(){
    return this.myForm.controls;
      }
  ajouterVehicule(){
    console.log("aa");
    console.log(this.myForm);
    const formData=new FormData();
    formData.append('marque', this.myForm.get('marque')?.value);
    formData.append('modele', this.myForm.get('modele')?.value);
    formData.append('matricule', this.myForm.get('matricule')?.value);
    formData.append('couleur', this.myForm.get('couleur')?.value);
    formData.append('nbr', this.myForm.get('nbr')?.value);
    formData.append('puissance', this.myForm.get('puissance')?.value);
    formData.append('datepremiere', this.myForm.get('datepremiere')?.value);
    formData.append('dateentre', this.myForm.get('dateentre')?.value);
    formData.append('boite', this.myForm.get('boite')?.value);
    formData.append('consomation_moy', this.myForm.get('consomation_moy')?.value);
    formData.append('maxreservoire', this.myForm.get('maxreservoire')?.value);
    formData.append('energie', this.myForm.get('energie')?.value);
    formData.append('dernierVisiteTechnique', this.myForm.get('dernierVisiteTechnique')?.value);
    formData.append('dernierAssurace', this.myForm.get('dernierAssurace')?.value);

    
    this.serv.add(formData).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(res.success==false){
        this.usedMatricule=true
        this.usedmatriculemsg=res.message
      }
      else{
        this.router.navigate(['gestion/vehicules']);

      }
    });

    this.alert=true;
      this.myForm.reset({})
  }
  closeAlert(){
    this.alert=false;
  }
 formulaire2(){
   this.f2=false;
 }


getchauffeurs(){
  this.chaufserv.getChauffeurs().subscribe(res=>{
    this.chauffeurs=res
  })
}

// onChangeChauff(event: any) {
//   this.id = event.target.value;
//   return this.chaufserv.getChauffByID(this.id).subscribe(data=>{
//     this.chauff =data;
//     console.log(this.chauff)
//   });

// }
}
