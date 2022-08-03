import { Component, OnInit } from '@angular/core';
import { ChauffeurService } from '../chauffeur.service';
import { Router } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-chauff-list',
  templateUrl: './chauff-list.component.html',
  styleUrls: ['./chauff-list.component.css']
})
export class ChauffListComponent implements OnInit {
  p : number=1;
  error: any="";
 chauffeurs:any="";
  public filterQuery = '';
  d: any;
  show=true
  constructor(private serv:ChauffeurService,private router:Router) { }

  ngOnInit(): void {
    this.getChauf();
 }
  getChauf(){
    this.serv.getChauffeurs().subscribe(
      res=>{
       // console.log(res);
        this.chauffeurs=res;

        
      }
    )
  }
  
  public recherchemissionbyparametre(key){
    
    key == '' || key[0] ==" "?  this.getChauf(): this.serv.chercher(key).subscribe(data=>{
      this.chauffeurs=data;
      console.log(this.chauffeurs);
    });
   
  }
  getparam(id:any){
    this.d=id;
  }
  SuprimerChauffeur(id:any){
   // console.log(id);
    this.serv.deleteChauffeurs(id).subscribe(
      
      res=>{
      //  console.log(res);
        this.getChauf();

           
}
    )

  }
  detailsChauffeur(id:any){
    this.router.navigate(['gestion/detailCauff/'+id])
  }
  updateChauffeur(id:any){
    this.router.navigate(['gestion/updateCauff/'+id])
  }

  downloadpdf(){
    console.log("downloadpdf");
    

    const doc = new jsPDF('l', 'mm', 'a4');
     doc.setFontSize(18);

     doc.text('La liste des chauffeurs', 120, 12);

     doc.setFontSize(12);
     doc.setTextColor(100);



    var listechauffeur =[];
     const head = [['Nom', 'prénom','cin','email','Tél','Date recrutement']];
     this.chauffeurs.forEach(element=>{
       var chauffeurss =[element.name,element.prenom,element.cin,element.email,element.tel,element.created_at.slice(0,10)];
       listechauffeur.push(chauffeurss);
     });
     
     autoTable(doc, {
       head: head,

       margin: {top: 20},
       body: listechauffeur,
       styles: {
         overflow: 'linebreak',
         lineWidth: 0.02,
         lineColor: [217, 216, 216]
       },
       didDrawCell: data => {}

     });

     doc.save('listechauffeurs.pdf');
   }
  }
