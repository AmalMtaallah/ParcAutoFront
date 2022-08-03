import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../MaintenanceServices.service';

@Component({
  selector: 'app-historiquemaintenance',
  templateUrl: './historiquemaintenance.component.html',
  styleUrls: ['./historiquemaintenance.component.css']
})
export class HistoriquemaintenanceComponent implements OnInit {
  p : number=1;
  historiquevidange: any="";
  affichervidange: boolean;
  historiquepneu: any="";
  afficherpneu: boolean;
  historiquevTech:any=""
  afficherVT:boolean
  histoasurance:any=""
  afficherassu:boolean
    constructor(private maintenanace:MaintenanceService) { }

  ngOnInit(): void {
    this.gethistoriquevidange()
    this.affichervidange=false
    this.afficherpneu=false
    this.afficherVT=false
    this.afficherassu=false
    this.gethistoriquepneu()
    this.gethistovt()
    this.gethistoass()
  }
  public gethistoriquevidange(){
    this.maintenanace.historiquevidange().subscribe(res=>{
      this.historiquevidange=res;
      console.log(this.historiquevidange);     
    })
  }
  public gethistovt(){
    this.maintenanace.gethistoriqueVT().subscribe(res=>{
      this.historiquevTech=res
      console.log(this.historiquevTech)
    })
  }

  public gethistoass(){
    this.maintenanace.getHistoAssu().subscribe(res=>{
      this.histoasurance=res
    })
  }

  public gethistoriquepneu(){
    this.maintenanace.gethistoriquepneux().subscribe(res=>{
      this.historiquepneu=res;
      console.log(this.historiquepneu);
      
    })
  }


  onChangeFood($event) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    if(isChecked==true){
    this.afficherpneu=false
    this.afficherVT=false
    this.afficherassu=false
    }



  }
  onChangeFood2($event) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    if(isChecked==true){
    this.affichervidange=false
    this.afficherVT=false
    this.afficherassu=false
    }
  }

  onChangeFood3($event){
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    if(isChecked==true){
      this.afficherpneu=false
      this.affichervidange=false
      this.afficherassu=false
      }
  }
  onChangeFood4($event){
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    if(isChecked==true){
      this.afficherpneu=false
      this.affichervidange=false
      this.afficherVT=false
      }
  }
}
