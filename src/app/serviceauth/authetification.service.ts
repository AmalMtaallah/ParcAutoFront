import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthetificationService {
 // private isLoggedIn = new BehaviorSubject<boolean>(false);
 private isLoggedIn =  false;
  public usertype:string="";
  constructor(private http: HttpClient,private router :Router) {}
userconnect:any
  // Toogle Loggedin
  toggleLogin(state: boolean): void {
   // this.isLoggedIn.next(state);
    this.isLoggedIn=state;
  }

  // Status
  status() {
    const localData: any = localStorage.getItem('user');
 /*  if(!localData && this.router.url ==="/dashboard")
    {
      this.router.navigate(['/login']);
    }*/
    if (!localData ) {
      
      console.log("route now  in authentification  "+ this.router.url)
      //this.isLoggedIn.next(false);
            this.isLoggedIn = false;

    } else {
      const userObj = JSON.parse(localData);
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
      if (token_expires_at > current_date) {
       // this.isLoggedIn.next(true);
       this.isLoggedIn = true;

      } else {
      //  this.isLoggedIn.next(false);
      this.isLoggedIn = false;

         console.log('Token Expires!!');
      }
    }
  // return this.isLoggedIn.asObservable();
   return this.isLoggedIn;

  }

  // Login
  login(email: string, password: string) {
    return this.http.post('http://localhost:8000/api/login', {
      email: email,
      password: password,
    });
  }
  // isAdmin(){
  //   this.userconnect=this.user()
  //   console.log(this.userconnect)
  // }

  // User Info
  user() {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    
    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('http://localhost:8000/api/user', {
      headers: headers,
    });
  }

  // Logout
  logout(allDevice: boolean){
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('http://localhost:8000/api/logout', {allDevice:allDevice}, {headers:headers});
  }

  // Register
  register(name:string, email:string, password:string, password_confirmation:string){
    const data={
      name:name,
      email:email,
      password:password,
      password_confirmation:password_confirmation,
    }
    return this.http.post('http://localhost:8000/api/register', data);
  }

  // Forgot Pass
  forgot(email:string){
    return this.http.post('http://localhost:8000/api/forgot', {email:email});
  }

  // Reset Pass
  reset(token:string, password:string,password_confirmation:string){

    const data={
      token:token,
      password:password,
      password_confirmation:password_confirmation
    }
    return this.http.post('http://localhost:8000/api/reset', data);
  }


 


}
