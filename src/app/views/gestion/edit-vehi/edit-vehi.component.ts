import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs-compat/operator/first';
import { Vehicule } from '../../../model/vehicule.model';
import { ChauffeurService } from '../chauffeur.service';
import { ServiceVehiculeService } from '../service-vehicule.service';

@Component({
  selector: 'app-edit-vehi',
  templateUrl: './edit-vehi.component.html',
  styleUrls: ['./edit-vehi.component.css']
})
export class EditVehiComponent implements OnInit {
  id:any
  data:any
  chauffeurs:any
  f1:boolean
  f2:boolean=true
  f3:boolean=true
  chauff:any
  chauffname:any
    constructor(private route:ActivatedRoute,private serv:ServiceVehiculeService,private chaufserv:ChauffeurService,private router:Router) { }
    editvehicule=new FormGroup({
      marque:new FormControl(''),
      modele:new FormControl(''),
      matricule:new FormControl(''),
      couleur: new FormControl(''),
    nbr: new FormControl(''),
    puissance: new FormControl(''),
    datepremiere: new FormControl(''),
    dateentre: new FormControl(''),
    boite: new FormControl(''),
    conducteur: new FormControl(''),
    })
    ngOnInit(): void {
    this.chauffname=this.getchaufnom(2)
 this.f1=false
  this.id=this.route.snapshot.params['id']
  this.serv.getVehiculeByID(this.id).subscribe(data=>{
this.editvehicule=new FormGroup({
  marque:new FormControl(data['marque']),
  modele:new FormControl(data['modele']),
  matricule:new FormControl(data['matricule']),
  couleur: new FormControl(data['couleur']),
  //nbr: new FormControl(data['nbr']),
 puissance: new FormControl(data['puissance']),
  datepremiere: new FormControl(data['datepremiere']),
  dateentre: new FormControl(data['dateentre']),
  //boite: new FormControl(data['boite']),
  //conducteur: new FormControl(this.chauffname),

 })  })
}
  update(){
    this.serv.updateVehicule(this.id,this.editvehicule.value).subscribe(res=>{
      this.router.navigate(['gestion/vehicules']); })
  }
  formulaire2(){
    this.f2=false;
  }
 
  formulaire3(){
   this.f3=false;
 }
 
// getchauffeurs(){
//   this.chaufserv.getChauffeurs().subscribe(res=>{
//     this.chauffeurs=res
//   })
// }
getchaufnom(id)  {
    this.chaufserv.getChauffByID(id).subscribe(res=>{
      this.chauff=res
      return this.chauff.name
    })
}
onChangeChauff(event: any) {
  this.id = event.target.value;
  return this.chaufserv.getChauffByID(this.id).subscribe(data=>{
    this.chauff =data;
    console.log(this.chauff)
  });

 

}
}
