import { Component, OnInit } from '@angular/core';
import { ChauffeurService } from '../chauffeur.service';
import { Router,ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
@Component({
  selector: 'app-modifier-chauff',
  templateUrl: './modifier-chauff.component.html',
  styleUrls: ['./modifier-chauff.component.css']
})
export class ModifierChauffComponent implements OnInit {
  user:any;
  data:any;
   alert:boolean=false;
   message?:any;
   messageAff?:any;
   status:any;
   files:any;
   submitted = false;
 usedEmail=false;
 chauf:any;
 id:any;
  constructor(private serv:ChauffeurService,private router:Router,private route :ActivatedRoute) { }
  editvehicule=new FormGroup({
    name: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    adress: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]),
    email: new FormControl('', [Validators.required,Validators.email]),
    image: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    cin: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]),
    datenaiss: new FormControl('', [Validators.required]),
    datesortie: new FormControl('', [Validators.required]),
    datefin: new FormControl('', [Validators.required]),
    numpermis: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.serv.getChauffByID(this.id).subscribe(data=>{

      this.editvehicule=new FormGroup({
        name:new FormControl(data['name']),
        adress:new FormControl(data['adress']),
        tel:new FormControl(data['tel']),
        email:new FormControl(data['email']),
        prenom:new FormControl(data['prenom']),
        cin:new FormControl(data['cin']),
        image:new FormControl(data['image']), 
        datenaiss: new FormControl(data['datenaiss']),
        datesortie: new FormControl(data['datesortie']),
        datefin: new FormControl(data['datefin']),
        numpermis: new FormControl(data['numpermis']),



      
       })    
    
    });
  }
  update(){
    this.serv.updateChauffeur(this.id,this.editvehicule.value).subscribe(res=>{
      this.router.navigate(['/gestion/chauffeurs']); })
  }
  get f(){
    return this.editvehicule.controls;
      }
  onSelectFile($event  :Event) {

    // @ts-ignore
        this.files = $event.target.files[0];
        console.log(this.files.name);
    
      }

}
