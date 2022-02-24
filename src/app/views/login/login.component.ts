import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthetificationService } from '../../serviceauth/authetification.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor( private router:Router, private auth:AuthetificationService) { }
  loggedIn:boolean = false;

  ngOnInit(): void {
    this.auth.status().subscribe((res) => {
      this.loggedIn = res;
      // console.log('navbar:' + this.loggedIn);
    }, (err) => {
      this.error=err.error.error;
    })
  }
  public error=null
  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;

    //console.log(email, password);
    this.auth.login(email,password).subscribe((res:any)=>{
    //console.log(res);
      localStorage.setItem('user', JSON.stringify(res))

      // redirect to dashboard
      this.router.navigate(['dashboard']);
    },
    (err)=>{
    this.error= err.error.error;
    })

  }


 }
