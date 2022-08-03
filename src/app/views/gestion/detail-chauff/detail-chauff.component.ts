import { Component, OnInit } from '@angular/core';
import { ChauffeurService } from '../chauffeur.service';
import { Router,ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-detail-chauff',
  templateUrl: './detail-chauff.component.html',
  styleUrls: ['./detail-chauff.component.css']
})
export class DetailChauffComponent implements OnInit {
id:any;
user:any=""
form1: boolean;
files:any
errors={
  email:null,
  minLength:null,
  maxLength:null,
  pattern:null
}
  formchangercoordonness: boolean;
imagedirectory :any ='http://127.0.0.1:8000/public/image/';
  constructor(private serv:ChauffeurService,private router:Router,private route :ActivatedRoute) { }
 
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.form1 = false;
    this.formchangercoordonness = true;
    this.serv.getChauffByID(this.id).subscribe(data=>{
      this.user=data;
     
    },
    
  (err) =>{
    console.log(err);
  })

    
  }


}
