import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AuthetificationService } from '../../../serviceauth/authetification.service';
import { ChauffeurService } from '../../gestion/chauffeur.service';

@Component({
  selector: 'app-profilechauf',
  templateUrl: './profilechauf.component.html',
  styleUrls: ['./profilechauf.component.css']
})
export class ProfilechaufComponent implements OnInit {
  id:any;
  user:any=""
  form1: boolean;
  files:any
  formchangercoordonness: boolean;
  formchangerpassword: boolean;
  errors={
    email:null,
    minLength:null,
    maxLength:null,
    pattern:null,
    password:null,
    password_confirmation:null
  }
  error:any=[]
  trouve:boolean
imagedirectory :any ='http://127.0.0.1:8000/public/image/';
  constructor(private toasterService: ToasterService,private auth:AuthetificationService,private serv:ChauffeurService,private router:Router,private route :ActivatedRoute) { }
 
  myForm:any=new FormGroup({
    name: new FormControl('', [Validators.required]),
    adress: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[0-9]*$")]),
    email: new FormControl('', [Validators.required,Validators.email]),
    image: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),

  });
  ngOnInit(): void {
    const userr :any =JSON.parse(localStorage.getItem('user')) 
    this.form1 = false;
    this.formchangercoordonness = true;
   this.formchangerpassword = true;
   this.serv.getChauffByID(userr.id).subscribe(data=>{
    this.user=data;
   })
  }
  showchangerCoordonnes() {
    this.form1 = true;
    this.formchangerpassword = true;
    this.formchangercoordonness = false;
  }

  showchangerpassword() {
    this.form1 = true;
    this.formchangerpassword = false;
    this.formchangercoordonness = true;
  }
  update(){

    // this.serv.updateChauffeur(this.id,this.editchauffeur.value).subscribe(res=>{
    //   this.router.navigate(['/gestion/chauffeurs']); })
    const formData=new FormData();
    formData.append('name', this.myForm.get('name')?.value);
    formData.append('adress', this.myForm.get('adress')?.value);
    formData.append('tel', this.myForm.get('tel')?.value);
    formData.append('email', this.myForm.get('email')?.value);
    formData.append('prenom', this.myForm.get('prenom')?.value);
    formData.append('cin', this.myForm.get('cin')?.value);
    formData.append('image', this.files,this.files.name);
    this.serv.updateChauffeur(this.id,formData).subscribe(res=>{
      //this.message=this.data.message;
    //  this.status=this.data.status;
      this.router.navigate(['gestion/chauffeurs']);
    },
    (err)=>{
      this.errors=err.error.errors;
      console.log(this.errors.email);
    }
    );
  
}
onSelectFile($event  :Event) {

  // @ts-ignore
      this.files = $event.target.files[0];
      console.log(this.files.name);
  
    }
   
    changepassword(formchangepassword:NgForm) {
      const userr :any =JSON.parse(localStorage.getItem('user')) 

    return this.serv.modifierpasswordprofile(userr.id,formchangepassword.value).subscribe(
      data=>this.handleResponse(data,formchangepassword),
        error =>this.handleError(error),

    );
  }

  showSuccess() {
    this.toasterService.pop('success', 'Success ', 'password modifier');
  }
  showError() {
    this.toasterService.pop('error', 'Error ', "ancien password incorrect");
  }


  handleResponse(data: any,loginForm : NgForm) {
    if(data)
    {
      this.showSuccess();
      localStorage.removeItem('user');
    if( ! this.auth.status())  this.router.navigate(['/']);
    }
    else
    {
      this.trouve = true;
      this.showError();

    }


  }

  
  handleError(error: any) {
    this.errors =error.error.errors;

    if(this.errors.password){
      this.toasterService.pop('error', 'error  ', this.errors.password);
    }
    if(this.errors.password_confirmation)
    {
      this.toasterService.pop('error', 'error  ', this.errors.password_confirmation);
    }
  }






}
