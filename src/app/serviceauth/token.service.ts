import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token :any,user :any)
  {

    localStorage.setItem('user', JSON.stringify(user));
     localStorage.setItem('token',token);
   const tokenResult = this.isValid();
   console.log(tokenResult);
  }
  getToken()
  {
    return localStorage.getItem('token');
  }
  getUserConnect()
  {
    return localStorage.getItem('user');
  }
  remove()
  {
    localStorage.removeItem('user');
    return localStorage.removeItem('token');

  }

  isValid()
  {
    const token =this.getToken();
    if(token)
    {
      const  payload = this.payload(token);
      if(payload)
      {
        return  (payload.iss==="http://localhost:8000/api/login")?true:false;
      }
    }
    return false;
  }
  payload(token :any)
  {
    const  payload=token.split('.')[0];
      //const  payload=token;

    return this.decode(payload);
  }

  decode(payload: string) {
    return JSON.parse(atob(payload));
  }

  loggedIn()
  {
    return this.isValid();
  }

}
