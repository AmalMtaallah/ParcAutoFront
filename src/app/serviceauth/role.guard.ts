import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
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
