import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceVehiculeService } from '../service-vehicule.service';
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent implements OnInit {
  p : number=1;
  error: any;
  vehicules:any;
  d: any;
   constructor(private serv:ServiceVehiculeService,private router:Router) { }
 
   ngOnInit(): void {
     this.getvehi();
   console.log(this.vehicules) }
   getvehi(){
     this.serv.getVehicules().subscribe(
       res=>{
        // console.log(res);
         this.vehicules=res;
         
       }
     )
   }
 
   public recherchemissionbyparametre(key){
    
    key == '' || key[0] ==" "?  this.getvehi(): this.serv.cherchervehicule(key).subscribe(data=>{
      this.vehicules=data;
      //console.log(this.vehicules);
    });
   
  }
  getparam(id:any){
    this.d=id;
  }
   SuprimerVehicule(id:any){
     console.log(id);
     this.serv.deleteVehicule(id).subscribe(
       
       res=>{
         console.log(res);
         this.getvehi();
         
       }
     )
 
   }
   
   detailVehi(id:any){
     this.router.navigate(['gestion/detail-vehi/'+id])
   }
   updateVehi(id:any){
     this.router.navigate(['gestion/edit-vehi/'+id])
   }
 
   downloadpdf(){
    console.log("downloadpdf");
    

    const doc = new jsPDF('l', 'mm', 'a4');
     doc.setFontSize(18);

     doc.text('La liste des véhicules', 120, 12);

     doc.setFontSize(12);
     doc.setTextColor(100);



    var listevehicule =[];
     const head = [['Marque', 'modéle','matricule','couleur','date mise en circulation']];
     this.vehicules.forEach(element=>{
       var vehiculles =[element.marque,element.modele,element.matricule,element.couleur,element.datepremiere];
       listevehicule.push(vehiculles);
     });
     
     autoTable(doc, {
       head: head,

       margin: {top: 20},
       body: listevehicule,
       styles: {
         overflow: 'linebreak',
         lineWidth: 0.02,
         lineColor: [217, 216, 216]
       },
       didDrawCell: data => {}

     });

     doc.save('listeVehicules.pdf');
   }
}
