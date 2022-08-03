import { Component, OnInit } from '@angular/core';
import { AuthetificationService } from '../../../serviceauth/authetification.service';
import { DashchaufService } from '../../dashboard/dashchauf.service';

@Component({
  selector: 'app-dashbord-chauf',
  templateUrl: './dashbord-chauf.component.html',
  styleUrls: ['./dashbord-chauf.component.css']
})
export class DashbordChaufComponent implements OnInit {
  missiontermin:any=""
  user: any="";
  userr: any;
  constructor(private auth:AuthetificationService,private serv:DashchaufService) { }

  ngOnInit(): void {
    this.historiquemission()
    this.auth.user().subscribe((res)=>{
      this.user = res;
    }, (err) =>{
      console.log(err);
    })
    const u :any =localStorage.getItem('user') ;
    this.userr =JSON.parse(u); 
  }

  public historiquemission(){
    const u :any =JSON.parse(localStorage.getItem('user')) ;
    this.serv.missiontermineee(u.id).subscribe(res=>{
      this.missiontermin=res
    })
  }
  
  public getmessionbyperiode(key){
    const userr :any =JSON.parse(localStorage.getItem('user')) ;
    this.serv.missionbydatechoisi(userr.id,key).subscribe( res=>{
      this.missiontermin=res;
    });
  }
  public recherchemissionbyparametre(key){
    
    const userr :any =JSON.parse(localStorage.getItem('user')) ;

    console.log(key);
    key == '' || key[0] ==" "?  this.historiquemission(): this.serv.chercher(key,userr.id).subscribe(data=>{
      this.missiontermin=data;
      console.log(this.missiontermin);
    });
   
  }


}
