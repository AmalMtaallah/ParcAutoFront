import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { chauItems } from '../../_chauf';
import { AuthetificationService } from '../../serviceauth/authetification.service';
import { Router } from '@angular/router';
import { MissionsService } from '../../views/mission/MissionService.service';
import { NotificationService } from '../../views/notifications/notificationService.service';
import { ServiceVehiculeService } from '../../views/gestion/service-vehicule.service';
import * as turf from '@turf/turf'
import{AppState}from '../../views/google-maps/service'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  user:any
  imagedirectory :any ='http://127.0.0.1:8000/public/image/';

  public navItems =navItems;
  public chaufItems=chauItems

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  checkbox:boolean = false;
  nbr: any=""
  nbralertes:any=""
  alertes:any=""
  nbrnotfadmin:any=""
  notfadmin:any=""
  notificationschauffeurs:any="";
  rappels: any="";
  nbrappels:any=""
  response:any=[];
  data:any=[]
  missionNotif:any;
  directions:any;
  coordonates:any;
  cooOutput:any;
  missions:any;

  constructor(private appState: AppState,private auth:AuthetificationService, private vser:ServiceVehiculeService,private notserv:NotificationService,private serv:MissionsService,private router:Router,@Inject(DOCUMENT) _document?: any) {
    this.appState.mylist;
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  // ngOnInit(): void {
  //  this.userconnect()
  // }
  ngOnInit(): void{
    //this.tracking()
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'ABCDEFG',
      cluster: 'mt1',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,    // Important Line
      disableStats: true,
    });
    echo.channel('notification')
      .listen('NotEvent', (res) => {
        console.log('Chat Event Data : ', res);
        const userr :any =JSON.parse(localStorage.getItem('user')) ;
      this.serv.nbrnot(userr.id).subscribe( res=>{
        this.nbr=res;

      })
      this.serv.getnotificationbyid(userr.id).subscribe(
        res=>{
         // console.log(res);
          this.notificationschauffeurs=res;
       // console.log(this.notifications)
        }
      )
      //  this.getnbrnotfadm()
      //  this.getnbnotadm()
      // this.VisiteTechNotif();
      // this.AssuranceNotif();
      // this.nbralertess()
      // this.getalertes()
      // this.getrappeles()
      // this.getnbrrappels()
    })
  
    const echo2 = new Echo({
      broadcaster: 'pusher',
      key: 'ABCDEFG',
      cluster: 'mt1',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,    // Important Line
      disableStats: true,
    });
    echo2.channel('notification')
      .listen('NotEvent', (res) => {
        console.log('Chat Event Data : ', res);
        const userr :any =JSON.parse(localStorage.getItem('user')) ;
        this.serv.getnotfadmin().subscribe(res=>{
          this.notfadmin=res
        })
      
      
        this.serv.nbrnotfadmin().subscribe(res=>{
          this.nbrnotfadmin=res
        })
    
      })
      const echo3 = new Echo({
        broadcaster: 'pusher',
        key: 'ABCDEFG',
        cluster: 'mt1',
        wsHost: window.location.hostname,
        wsPort: 6001,
        forceTLS: false,    // Important Line
        disableStats: true,
      });
      echo3.channel('notification')
        .listen('NotEvent', (res) => {
          console.log('Chat Event Data : ', res);
          const userr :any =JSON.parse(localStorage.getItem('user')) ;
          this.notserv.getrappel().subscribe(res=>{
            this.rappels=res
          });
        
          this.notserv.getnbrrappel().subscribe(res=>{
            this.nbrappels=res
          });
      
        })
        const echo4 = new Echo({
          broadcaster: 'pusher',
          key: 'ABCDEFG',
          cluster: 'mt1',
          wsHost: window.location.hostname,
          wsPort: 6001,
          forceTLS: false,    // Important Line
          disableStats: true,
        });
        echo4.channel('notification')
          .listen('NotEvent', (res) => {
            console.log('Chat Event Data : ', res);
           //
           this.vser.notifAssurance().subscribe(res=>{
    
          })
          this.vser.VisiteTechNotif().subscribe(res=>{
            
          })
        
          })
    this.getnotification();
   
    this.nbrnot()
    this.getnbnotadm()
    this.getnbrnotfadm()
     this.VisiteTechNotif();
     this.AssuranceNotif();
    this.nbralertess()
    this.getalertes()
    this.getrappeles()
    this.getnbrrappels()
   

    const u :any =localStorage.getItem('user') ;
    this.user =JSON.parse(u);
    
    console.log(this.user.usertype)




  
}

  
  userconnect()
{
  const u :any =localStorage.getItem('user') ;
    this.user =JSON.parse(u);
    
    console.log("testtttttt"+this.user)
    
} 
tracking(){
  this.serv.matching( -78.5008432, 38.0313705   , -78.5016022, 38.0321501 ).subscribe(res=>{
    console.log(res);
    this.directions=res;
   console.log(this.directions.routes[0].geometry.coordinates);
   this.coordonates=this.directions.routes[0].geometry.coordinates;
   //console.log(this.coordonates);
   console.log(this.coordonates);
   console.log(this.coordonates[1]);
      
  });
  const myHeart = turf.polygon([
    [
     [-78.5008432, 38.0313705 ],
     [-78.5016022, 38.0321501],
     [-78.5009312, 38.0323163],
     [-78.5005792, 38.0319718 ],
    
    // [-122.014576, 45.642963],
    // [-122.01456, 45.642914],
    // [-122.014651, 45.642837],
     [-78.5008432, 38.0313705],
    ]]);
  this.serv.AllMissionEnCours().subscribe(async res=>{
    this.missions=res;
   
   for(let i=0;i<this.missions.length;i++){
    console.log(this.missions[i].id);
    this.response.push(await fetch(
                      //'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson'     
                      '../../../../assets/'+this.missions[i].id+'.geojson'
                  ))     
               }
               //console.log(this.response.pathName)
 let respp=[];
const path=[];
               for(let resp=0;resp<this.response.length;resp++){
                 path.push(this.response[resp].url.split('/'));

            respp=[await path[resp][4].substring(0, 1),await this.response[resp].json()]
               console.log(respp);
                 this.data.push(await respp)
               console.log(this.data)
           
                
               }
               console.log(this.data)
               let m=0;
               let d=0;
               let t=0;
               let c=0;
               let s=0;
               let j=0;
               let  msg;
               let geoMission=[];
               let routeMission=[];
               
               const timer = setInterval(() => {
              this.data.forEach(  e => {
                //console.log( console.log(e[0]));
                this.cooOutput=m;
               
                  this.appState.mylist=m;
                //console.log("OUTPUT");
            // console.log(this)
     
               if(e[1].features[m]){
                 // console.log(e[0])
               // console.log(e[1].features[m].geometry.coordinates)
              }
                
                if(e[1].features[m] && t<e[1].features.length){
                  if(Number((e[1].features[m].properties.temperature))>90){
                    this.serv.vehiculeTraking(e[0]).subscribe( async res=>
                      {
                        this.missionNotif=res;
                       // console.log(this.missionNotif)
                         msg='le véhicule de matricule : '+ this.missionNotif[0].vehicule.matricule+" conduit par le chauffeur  : "+  this.missionNotif[0].user.name+" a depassé la temperature maximum ";
                         this.message(msg)
                      })
                     
                       
                        t=e[1].features.length;
                      }
                      t++;
                }

                if( e[1].features[m] && c<e[1].features.length){
                  if(Number((e[1].features[m].properties.carburant))<44){
                    this.serv.vehiculeTraking(e[0]).subscribe( async res=>
                      {
                        this.missionNotif=res;
                       // console.log(this.missionNotif)
                         msg='le véhicule de matricule : '+ this.missionNotif[0].vehicule.matricule+" conduit par le chauffeur  : "+  this.missionNotif[0].user.name+" a depassé la carburant  maximum ";
                         this.message(msg)
                      })
                       // console.log(msg);
                        c=e[1].features.length;
                      }
                      c++;
                }
                
                if(e[1].features[m] && s<e[1].features.length){
                  if((Number((e[1].features[m].properties.Speed).substr(0, 3)))>110){
                  
                    this.serv.vehiculeTraking(e[0]).subscribe( async res=>
                      {
                        this.missionNotif=res;
                       // console.log(this.missionNotif)
                         msg='le véhicule de matricule : '+ this.missionNotif[0].vehicule.matricule+" conduit par le chauffeur  : "+  this.missionNotif[0].user.name+"  a depassé la vitesse maximum ";
                         this.message(msg)
                      })
                  
                     s=e[1].features.length;
                    }
                    s++;
            
                }
                if(e[1].features[m] ){
              //console.log(e[1].features[m].geometry.coordinates[0])
                  var pt = turf.point(e[1].features[m].geometry.coordinates[0]);
                  var line = turf.lineString(this.coordonates);
                  var isPointOnLine = turf.booleanPointOnLine(pt, line);
                 // console.log(isPointOnLine);
                  if(isPointOnLine===false){
                    
                    
                    
                    if(!routeMission.includes(e[0])){
                    this.serv.vehiculeTraking(e[0]).subscribe( async res=>
                      {
                        this.missionNotif=res;
                       // console.log(this.missionNotif)
                       msg=this.missionNotif[0].id+" Route"
                        // msg='le véhicule de matricule : '+ this.missionNotif[0].vehicule.matricule+" conduit par le chauffeur  : "+  this.missionNotif[0].user.name+" a depassé la Route";
                         this.message(msg)
                      })}
                      routeMission.push(e[0])
                  }}
          
                 
                  
                  if(e[1].features[m]){
                    var markerWithin = turf.pointsWithinPolygon(pt, myHeart);
       //  console.log(markerWithin.features.length);
      if(markerWithin.features.length===0){
        if(!geoMission.includes(e[0])){
        this.serv.vehiculeTraking(e[0]).subscribe( async res=>
          {
            this.missionNotif=res;
           // console.log(this.missionNotif)
           msg=this.missionNotif[0].id+" Geogencing"
            // msg='le véhicule de matricule : '+ this.missionNotif[0].vehicule.matricule+" conduit par le chauffeur  : "+  this.missionNotif[0].user.name+" a depassé la Route";
             this.message(msg)
          })}
          geoMission.push(e[0]);
        
                  }}
                  
          
          
                  
                
            
              });
              m++;
              
              
              }, 1000);
                        
   
  })

}
async message(msg){
  this.serv.envoiealerte2(msg).subscribe(res=>{
              console.log(res)
            })
  console.log(msg);
}
deconnexion() {

  localStorage.removeItem('user');

  console.log("deconnexion");
  
if( ! this.auth.status())  this.router.navigate(['/']);
}


getnotification(){
  const u :any =JSON.parse(localStorage.getItem('user')) ;
  this.serv.getnotificationbyid(u.id).subscribe(
    res=>{
     // console.log(res);
      this.notificationschauffeurs=res;
   // console.log(this.notifications)
    }
  );
}
public nbrnot(){
  const userr :any =JSON.parse(localStorage.getItem('user')) ;
  this.serv.nbrnot(userr.id).subscribe( res=>{
    this.nbr=res;
  });
}


public nbralertess(){
  this.serv.nbralertes().subscribe( res=>{
    this.nbralertes=res;
  });
}

public getalertes(){
  this.serv.getalertes().subscribe( res=>{
    this.alertes=res;
  });
}
//Récuperer les notification de l admin
public getnbnotadm(){
  this.serv.getnotfadmin().subscribe(res=>{
    this.notfadmin=res
  })
}

public getnbrnotfadm(){
  this.serv.nbrnotfadmin().subscribe(res=>{
    this.nbrnotfadmin=res
  })
}
public  detailNotif() {
  
  //console.log(not.id);
  this.notserv.openNotif().subscribe(res=>{});
  this.getnbrnotfadm();
    this.router.navigate(['notifications/notifications/'])
  
}
public  detailalertes() {
  //console.log(not.id);
  this.notserv.openAlert().subscribe(res=>{});
  this.nbralertess();
    this.router.navigate(['notifications/alerts/'])
}
public detailsrappels() {
  //console.log(not.id);
  this.notserv.openRappel().subscribe(res=>{});
  this.getnbrrappels();
    this.router.navigate(['notifications/rappels/'])
}
public AssuranceNotif(){
  this.vser.notifAssurance().subscribe(res=>{
    
  })
  
}
public VisiteTechNotif(){
  this.vser.VisiteTechNotif().subscribe(res=>{
    
  })
}

public getrappeles(){
  this.notserv.getrappel().subscribe(res=>{
    this.rappels=res
  });
}
public getnbrrappels(){
  this.notserv.getnbrrappel().subscribe(res=>{
    this.nbrappels=res
  });
}
}
  
