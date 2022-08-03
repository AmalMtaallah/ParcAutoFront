import { Injectable } from '@angular/core';
import {TokenService} from "./token.service";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import { AuthetificationService } from './authetification.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService  implements CanActivate{


  constructor(private token:TokenService, private auth :AuthetificationService) { }

  canActivate(){
    let Role=localStorage.getItem('user')
    let user=JSON.parse(Role)
    let usertype=user.usertype
    if(usertype=="1"){
     return true;
    }
    alert("you dont have admin right")
    return false;

  }
}
