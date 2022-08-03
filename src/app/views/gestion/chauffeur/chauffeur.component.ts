import { Component, OnInit,Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule,AbstractControl, FormGroupName} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { ChauffeurService } from '../chauffeur.service';
import { NgModule } from '@angular/core';
import {NgForm} from "@angular/forms";
import { User } from '../../../model/user.model';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { AuthetificationService } from '../../../serviceauth/authetification.service';
/** passwords must match - custom validator */
export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  return password && confirm && password.value === confirm.value ? null : { 'passwordMismatch': true };
};

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css']
})
export class ChauffeurComponent implements OnInit {
  user:any="";
  data:any="";
   alert:boolean=false;
   message?:any="";
   messageAff?:any="";
   status:any="";
   files:any="";
   submitted = false;
 usedEmail=false;
 usedmailmessage:any=""
 datesortie:any=""
 datefin:any=""
errors :any = [
];
   constructor( private fb: FormBuilder, private serv:ChauffeurService,private router:Router ) { }
 
   dateValidator(control: FormControl){
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isAfter(today)) {
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

  }
  
  myForm:any=new FormGroup({
    name: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    adress: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]),
    email: new FormControl('', [Validators.required,Validators.email]),
    image: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    cin: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]),
    datenaiss: new FormControl('', [Validators.required,this.dateValidator]),
    datesortie: new FormControl('', [Validators.required,this.dateValidator]),
    datefin: new FormControl('', [Validators.required,this.dateValidator]),
    numpermis: new FormControl('', [Validators.required]),


  });
  get f(){
    return this.myForm.controls;
      }
  ajouterChauffeur(){
  
    const formData=new FormData();
    formData.append('name', this.myForm.get('name')?.value);
    formData.append('adress', this.myForm.get('adress')?.value);
    formData.append('tel', this.myForm.get('tel')?.value);
    formData.append('email', this.myForm.get('email')?.value);
    formData.append('prenom', this.myForm.get('prenom')?.value);
    formData.append('cin', this.myForm.get('cin')?.value);
    formData.append('image', this.files,this.files.name);
    formData.append('datenaiss', this.myForm.get('datenaiss')?.value);
    formData.append('datesortie', this.myForm.get('datesortie')?.value);
    formData.append('datefin', this.myForm.get('datefin')?.value);
    formData.append('numpermis', this.myForm.get('numpermis')?.value);
    this.serv.add(formData).subscribe(res=>{
      this.data=res;
      console.log(this.data)
      if(res.success==false){
        this.usedEmail=true
        this.usedmailmessage=res.message
      }
      else{
    this.router.navigateByUrl('gestion/chauffeurs');

      }      
    },

    );

    
      this.myForm.reset({})
  }
  onSelectFile($event  :Event) {

    // @ts-ignore
        this.files = $event.target.files[0];
       // console.log(this.files.name);
        
      }




 }
