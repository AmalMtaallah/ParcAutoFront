import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthetificationService } from '../../serviceauth/authetification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  checkbox:boolean = true;
  constructor(private auth:AuthetificationService, private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    // console.log(this.checkbox);
    this.auth.logout(this.checkbox).subscribe((res)=>{
      console.log(res);
      localStorage.removeItem('user');

      this.auth.toggleLogin(false);
      // Redirect
      this.router.navigateByUrl('logout/loginn');
    }, (err) =>{
      console.log(err)
    })
  }
}
