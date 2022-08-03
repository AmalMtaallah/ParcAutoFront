import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceVehiculeService } from '../service-vehicule.service';

@Component({
  selector: 'app-detail-vehi',
  templateUrl: './detail-vehi.component.html',
  styleUrls: ['./detail-vehi.component.css']
})
export class DetailVehiComponent implements OnInit {
  constructor(private router : ActivatedRoute,private serv:ServiceVehiculeService) { }
  vehi:any=""
  
  ngOnInit(): void {
    const id = this.router.snapshot.params.id;
    this.serv.getVehiculeByID(id).subscribe(data=>{
      this.vehi =data;
      console.log(data)
  },
  (err) =>{
    console.log(err);
  })
}

}
