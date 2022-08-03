import { Component, OnInit, ViewChild } from '@angular/core';
import{MissionsService}from '../MissionService.service';
import { ChauffeurService } from '../../gestion/chauffeur.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';
import * as turf from '@turf/turf'


@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {
  p : number=1;
  p1 : number=1;
  p2 : number=1;
  p3 : number=1;
  p4 : number=1;
missions:any=[];
chauff:any=[];
name:any;
exampleModal:any;
missionModal:any;
id:any;
imagedirectory :any ='http://127.0.0.1:8000/public/vidange/';
afficherajourdhui:boolean

//@ViewChild('largeModal') public largeModal: ModalDirective;

public visible = false;
  public visibleAnimate = false;
  coordonnes: any="";
  afficherdeuxsemaines: boolean;
  affichercetsemaine: boolean;
  afficherprochainesemaine: boolean;
  msgonload: boolean;
  dateactuelle: any;
  missionaujourdui: any=""
  missionscetsemaine: any=""
  missionsemainceprochaine: any=""
  missionsdeuxsemaines: any=""
  affichertout: boolean;
  missionsdateselec: any;
  afficherperiode: boolean;
  missionchercher: any;
  afficherparametre: boolean;





  constructor(private missionSer:MissionsService,private serv:ChauffeurService,private router:Router) { }
  
  ngOnInit(): void {
    this.afficherajourdhui=false
    this.affichercetsemaine=false
    this.afficherprochainesemaine=false
    this.afficherdeuxsemaines=false
    this.afficherparametre=false
    this.msgonload=true
    this.affichertout=false
    this.afficherperiode=false
    this.AllMission();
    this.getdate()
    this.getmissionsdeuxsemainnes()
    this.getmissionsdelasemaineprochain()
    this.getmissionsdateactuelle()
    this.getmissionsetsemaine()
  
  }
  ShowDetail(id:any){
    this.router.navigate(['mission/detailLivraison/'+id])
  }
  public show(m:any): void {
    console.log(m);
    this.missionModal=m;
    this.id=this.missionModal.id;
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }
  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  
AllMission(){
  this.missionSer.getmissions().subscribe( res=>{
    console.log(res);
    this.missions=res;
    
  });
}

SuprimerMission(id:any){
  console.log(id);
  this.missionSer.deleteMission(id).subscribe(
    
    res=>{
      console.log(res);
      this.AllMission();
      this.hide();
    }
  )

}
downloadpdf(){
    console.log("downloadpdf");
    

    const doc = new jsPDF('l', 'mm', 'a4');
     doc.setFontSize(18);

     doc.text('La liste des missions', 120, 12);

     doc.setFontSize(12);
     doc.setTextColor(100);



    var listfact =[];
     const head = [['Destination', 'Chauffeur','Véhicule','Date','Temps de départ','Temps d arrivé']];
     this.missions.forEach(element=>{
       var facture =[element.adress,element.user.name,element.vehicule.matricule,element.date,element.departTime,element.arriveTime];
       listfact.push(facture);
     });
     
     autoTable(doc, {
       head: head,

       margin: {top: 20},
       body: listfact,
       styles: {
         overflow: 'linebreak',
         lineWidth: 0.02,
         lineColor: [217, 216, 216]
       },
       didDrawCell: data => {}

     });

     doc.save('listemissions.pdf');
   }

  
  public getmessionbyperiode(key){
    this.missionSer.getmissionadminbydatechoisie(key).subscribe( res=>{
      this.missionsdateselec=res;
      console.log(this.missionsdateselec)
    });
    this.afficherperiode=true
    this.msgonload=false
    this.afficherajourdhui=false
    this.affichertout=false
    this.afficherdeuxsemaines=false
    this.affichercetsemaine=false
    this.afficherprochainesemaine=false
    this.msgonload=false
    this.afficherparametre=false

  }
  public recherchemissionbyparametre(key){
    
    key == '' || key[0] ==" "?  this.AllMission(): this.missionSer.chercher(key).subscribe(data=>{
      this.missionchercher=data;
      console.log(this.missionchercher);
    });
    this.afficherparametre=true
    this.afficherperiode=false
    this.msgonload=false
    this.afficherajourdhui=false
    this.affichertout=false
    this.afficherdeuxsemaines=false
    this.affichercetsemaine=false
    this.afficherprochainesemaine=false
   
  }

  
onChangeFood($event) {
  const id = $event.target.value;
  const isChecked = $event.target.checked;
  if(isChecked==true){
  this.afficherajourdhui=true
  this.affichertout=false
  this.afficherdeuxsemaines=false
  this.affichercetsemaine=false
  this.afficherprochainesemaine=false
  this.msgonload=false
  this.afficherperiode=false
  this.afficherparametre=false


  }



}
onChangeFood2($event) {
  const id = $event.target.value;
  const isChecked = $event.target.checked;
  if(isChecked==true){
  this.affichercetsemaine=true
  this.affichertout=false
  this.afficherajourdhui=false
  this.afficherdeuxsemaines=false
  this.afficherprochainesemaine=false
  this.msgonload=false
  this.afficherperiode=false
  this.afficherparametre=false



  }


}
onChangeFood3($event) {
  const id = $event.target.value;
  const isChecked = $event.target.checked;
  if(isChecked==true){
  this.afficherprochainesemaine=true
  this.affichertout=false
  this.afficherajourdhui=false
  this.affichercetsemaine=false
  this.afficherdeuxsemaines=false
  this.msgonload=false
  this.afficherperiode=false
  this.afficherparametre=false



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
  this.affichertout=false
  this.msgonload=false
  this.afficherperiode=false
  this.afficherparametre=false



  }
}

onChangeFood5($event) {
  const id = $event.target.value;
  const isChecked = $event.target.checked;
  if(isChecked==true){
  this.afficherdeuxsemaines=false
  this.afficherajourdhui=false
  this.affichertout=true
  this.affichercetsemaine=false
  this.afficherprochainesemaine=false
  this.msgonload=false
  this.afficherperiode=false
  this.afficherparametre=false



  }
}

public getdate(){
  this.missionSer.getdatenow().subscribe( res=>{
    this.dateactuelle=res;
  });
}

public getmissionsdateactuelle(){

  this.missionSer.missionbydate().subscribe( res=>{
    this.missionaujourdui=res;
  });
}

public getmissionsetsemaine(){
this.missionSer.getmissioncetsemaine().subscribe(res=>{
  this.missionscetsemaine=res
})
}

public getmissionsdelasemaineprochain(){
this.missionSer.getmissionsprochweek().subscribe(res=>{
  this.missionsemainceprochaine=res
  console.log("res")
})
}
public getmissionsdeuxsemainnes(){
this.missionSer.getmissionsdeuxsemaines().subscribe(res=>{
  this.missionsdeuxsemaines=res
  console.log("res")
})
}



}
