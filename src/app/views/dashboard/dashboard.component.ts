import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { AuthetificationService } from '../../serviceauth/authetification.service';
import { CommonModule } from '@angular/common';
import { DashchaufService } from './dashchauf.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MissionsService } from '../mission/MissionService.service';
import { Router } from '@angular/router';
import * as turf from '@turf/turf'
import { CalendarOptions } from '@fullcalendar/angular'
import dayGridPlugin from '@fullcalendar/daygrid';
import * as mapboxgl from 'mapbox-gl';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
afficherajourdhui:boolean
msgonload:boolean
affichercetsemaine:boolean
afficherprochainesemaine:boolean
afficherdeuxsemaines:boolean
  user:any
  missions: any;
  userr: any;
  dateactuelle: any;
  missionaujourdui: any="";
  periodee: any="";
  missiondatechoisi: any;
  nbr:any=""
  nb:any="";
  nbvehicules:any=""
  nbvehienlivraison:any=""
  fivelatestusers:any=""
  imagedirectory :any ='http://127.0.0.1:8000/public/image/';
  nbtotal:any=""
  nbmissionparadress:any=""
  essai=45+"%"
  totaladress:any=""
  nbmiss: any="";
  mois:any[]= ['janvier', 'ferier', 'mars', 'avril', 'mai', 'juin', 'juillet','aout','september','october','november','december'];
  missionTerminer: any="";
  missionscetsemaine: any="";
  missionsemainceprochaine: any="";
  missionsdeuxsemaines: any="";
  coordoné: any="";
  alt: any="";
  long:any=""
  distance: number;
  distancefinale: string;
  terminatedmiss:any=""
  afficherbutton:boolean=true
  calendarOptions: CalendarOptions;
  map:any;
  Events :any= [];
  constructor(private auth:AuthetificationService,private router:Router,private dashserv:DashchaufService,private missionSer:MissionsService) {}
  ngOnInit(): void {
    this.afficherajourdhui=false
    this.affichercetsemaine=false
    this.afficherprochainesemaine=false
    this.afficherdeuxsemaines=false
    this.msgonload=true
    this.valider()
    this.missionstermine()
    this.totaledestination()
    this.get5latestusers()
    this.gettotal()
    this.getnbpardest()
    this.nbvehienlivraisons()
    this.getdate()
    this.nbchauf()
    this.nbvehicule()
    this.calender()
    this.getnbmissionsparmois()

    this.auth.user().subscribe((res)=>{
      this.user = res;
    }, (err) =>{
      console.log(err);
    })
    const u :any =localStorage.getItem('user') ;
    this.userr =JSON.parse(u);  
   
    setTimeout(() => {
      this.calendarOptions = {
        //plugins: [ dayGridPlugin ],  
        initialView: 'dayGridMonth',
        eventClick:this.eventClick.bind(this),
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridDay,dayGridWeek,dayGridMonth'
        },    
        events: this.Events,
       
      };
    }, 40); 
    
    // generate random values for mainChart
    
  }
  // AllMission(){
  //   const userr :any =JSON.parse(localStorage.getItem('user')) ;

  //   this.dashserv.getmissions(userr.id).subscribe( res=>{
  //     console.log(res);
  //     this.missions=res;
  //   });
  // }
  
  eventClick(info) {
    //alert('Event: ' + info.event.title);
   // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
   // alert('View: ' + info.view.type);
  
    // change the border color just for fun
  
    info.el.style.borderColor = 'red';
    //console.log(info.event.id)
    this.router.navigate(['chauffeur/mission/'+info.event.id])
    
  }
  calender(){
    const u :any =JSON.parse(localStorage.getItem('user')) ;
      setTimeout(() => {
        this.dashserv.calenderMission(u.id).subscribe(res => {
            this.Events=JSON.parse(JSON.stringify(res));
            //ghalta this.Events = JSON.stringify(res);
            //this.Events=res;
              console.log(this.Events);
          });
      },30);
  
    }
    MarquerPresence(){
      (mapboxgl as any).accessToken = 'pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A';
      this.map= new mapboxgl.Map({
        container: 'geofence', // Specify the container ID
        style: 'mapbox://styles/mapbox/streets-v11', // Specify which map style to use
        center: [10.163140922614268,36.864756339378715], // Specify the starting position
        zoom: 7, // Specify the starting zoom
      });
      const marker1 = new mapboxgl.Marker()
      .setLngLat([10.163140922614268,36.864756339378715])
      .addTo(this.map);
      var geolocate = new mapboxgl.GeolocateControl();
  
      this.map.addControl(geolocate);
      geolocate.on('geolocate', async function(e) {
            var lon = e.coords.longitude;
            var lat = e.coords.latitude
            var position = [lon, lat];
            console.log(position);
            console.log(this.from)
           
            var distance = turf.distance([10.210501,36.869894], position, { units: 'kilometers' });
            if(distance < 0.01 ){
              this.afficherbutton=false
              console.log(this.afficherbutton)
            }
            else {
              console.log(this.afficherbutton)
              this.afficherbutton=true

            }
      });
     
    }
    valider(){
      this.afficherbutton
      console.log(this.afficherbutton)
    }
  
  public Present(){
    const u :any =JSON.parse(localStorage.getItem('user')) ;
    this.dashserv.ajouterpresencechauf(u.id).subscribe(res=>{
      console.log(res)
    })
  }
 
  public missionstermine(){

    this.dashserv.allterminatedmiss().subscribe(res=>{
      this.terminatedmiss=res
    })
  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public getdate(){
    this.dashserv.getdatenow().subscribe( res=>{
      this.dateactuelle=res;
    });
  }
   
public lancer(id:any){
  this.dashserv.lancer(id).subscribe( res=>{
  });
}
public nbvehicule(){
this.dashserv.nbvehicules().subscribe(res=>{
  this.nbvehicules=res
})
}
public nbchauf(){
  this.dashserv.nbchauffeur().subscribe( res=>{
    this.nb=res
  });
}

public nbvehienlivraisons(){
  this.dashserv.nbvehienlivraison().subscribe(res=>{
this.nbvehienlivraison=res
  })
}
public get5latestusers(){
  this.dashserv.getchaufeurpermis().subscribe(res=>{
    this.fivelatestusers=res
    console.log(this.fivelatestusers)
  })
}

public gettotal(){
  this.dashserv.totalmission().subscribe(res=>{
    this.nbtotal=res
    console.log(res)
  })
}

public getnbpardest(){
  this.dashserv.nbmissionparadress().subscribe(res=>{
    this.nbmissionparadress=res
    for(let i=0;i<this.nbmissionparadress.length;i++){
   this.pieChartLabels.push(this.nbmissionparadress[i].adress)
   this.pieChartData.push(this.nbmissionparadress[i].total)
    }
  })
}

 public totaledestination(){
   this.dashserv.totaldestination().subscribe(res=>{
     this.totaladress=res
   })
  }

  public getnbmissionsparmois(){
    this.dashserv.nbmissionparmois().subscribe(res=>{
      this.nbmiss=res
      for(let i=0;i<this.nbmiss.length;i++){
       this.barChartData[0].data.push(this.nbmiss[i].total)
       this.barChartLabels.push(this.mois[this.nbmiss[i].month-1])


      }
      console.log(this.barChartData[0].data)

    })
   
  }


public pieChartLabels: string[] = [];
 public pieChartData: number[] = [];
 public pieChartType = 'pie';

 // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {

      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }], yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
  };
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [], label: 'Nombre missions'},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public terminer(id:any){
    //var to = [36.4552896279554, 10.721520788950974] //lng, lat
    var from = [36.864756339378715,10.163140922614268]
   
    //console.log(distance)
  
    this.missionSer.getMissionByID(id).subscribe(res=>{
      console.log(res);
      this.missionTerminer=res;
      const id=this.missionTerminer.id;
      console.log(id);
      const destination=this.missionTerminer.adress
      console.log(destination)
      this.missionSer.addressLookup2(destination).subscribe(res=>{
         this.coordoné=res
    console.log(this.coordoné)
     const alt=this.coordoné.features[0].geometry.coordinates[0]
     const long=this.coordoné.features[0].geometry.coordinates[1]
     console.log(long)
     console.log(alt)
    this.distance = turf.distance([long,alt],from);
        this.distancefinale=this.distance.toFixed(2)
     console.log(this.distancefinale)
      })
     
    
      const formData=new FormData();
      this.missionSer.setTerminatedMission(this.distancefinale,id,formData).subscribe(res=>{
        console.log(res);
      })
     
      this.VidangeNotif(this.missionTerminer.vehicule_id);
      this.notifChangementPneux(this.missionTerminer.vehicule_id);
    
  });
  }
  
VidangeNotif(ids:any){
  this.missionSer.vidangeNotif(ids).subscribe(res=>{
    console.log(res);
    
  })
}
notifChangementPneux(ids:any){
  this.missionSer.notifChangementPneux(ids).subscribe(res=>{
    console.log(res);
    
  })
}


onChangeFood($event) {
  const id = $event.target.value;
  const isChecked = $event.target.checked;
  if(isChecked==true){
  this.afficherajourdhui=true
  this.afficherdeuxsemaines=false
  this.affichercetsemaine=false
  this.afficherprochainesemaine=false
  this.msgonload=false
  }



}
onChangeFood2($event) {
  const id = $event.target.value;
  const isChecked = $event.target.checked;
  if(isChecked==true){
  this.affichercetsemaine=true
  this.afficherajourdhui=false
  this.afficherdeuxsemaines=false
  this.afficherprochainesemaine=false
  this.msgonload=false

  }


}
onChangeFood3($event) {
  const id = $event.target.value;
  const isChecked = $event.target.checked;
  if(isChecked==true){
  this.afficherprochainesemaine=true
  this.afficherajourdhui=false
  this.affichercetsemaine=false
  this.afficherdeuxsemaines=false
  this.msgonload=false

  }
}

onChangeFood4($event) {
  const id = $event.target.value;
  const isChecked = $event.target.checked;
  if(isChecked==true){
  this.afficherdeuxsemaines=true
  this.afficherajourdhui=false
  this.affichercetsemaine=false
  this.afficherprochainesemaine=false
  this.msgonload=false

  }


}




detailmission(id:any){
  this.router.navigate(['chauffeur/mission/'+id])
}

}

