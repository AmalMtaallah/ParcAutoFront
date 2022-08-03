import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http:HttpClient ) {}

  private baseUrl='http://localhost:8000/api/';
 /* public add(form:any){
    const header=new HttpHeaders;
    return this.http.post<any>(this.baseUrl+'addvehicule/',form)}*/

    public getAssurance(){return this.http.get(this.baseUrl+'assurance')}
    public updateAssurance(form:any){return this.http.post(this.baseUrl+'updateAssurance/',form)}
    public visiteTechnique(){return this.http.get(this.baseUrl+'visiteTechnique')}
    public updateVisiteTechnique(form:any){return this.http.post(this.baseUrl+'updateVisiteTechnique/',form)}
    public getallAssurances(){return this.http.get(this.baseUrl+'getallassurance')}
    public getdatenow(){return this.http.get(this.baseUrl+'getdateactuelle/')}
    public allvisiteTechnique(){return this.http.get(this.baseUrl+'getallvisitetechnique')}
  
    public pneux(){return this.http.get(this.baseUrl+'pneux')}
    public allpneux(){return this.http.get(this.baseUrl+'allpneux')}
    public allvidanges(){return this.http.get(this.baseUrl+'allvidange')}

    public historiquevidange(){return this.http.get(this.baseUrl+'gethistoriquevidange')}
    public gethistoriquepneux(){
      return this.http.get(this.baseUrl+'gethistoriquepneu')
    }
    public gethistoriqueVT(){
      return this.http.get(this.baseUrl+'gethistoriquevt')
    }

    public getHistoAssu(){
      return this.http.get(this.baseUrl+'gethistoassur')
    }

    

    
    public updatepneux(form:any){return this.http.post(this.baseUrl+'updatepneux/',form)}
    public vidange(){return this.http.get(this.baseUrl+'vidange')}
    public updatevidange(form:any){return this.http.post(this.baseUrl+'updatevidange/',form)}
    //public deleteVehicule(id:any){return this.http.delete(this.baseUrl+'deletevehicule/'+id)}
    //public getVehiculeByID(id:any){return this.http.get(this.baseUrl+'getvehicule/'+id)}
    //public updateVehicule(id:any,form:any){return this.http.post(this.baseUrl+'updatevehicule/'+id,form)}
    public getassurancesbymotnh(month:string){
      return this.http.get(this.baseUrl+'getassurancesbymotnh/'+month)
    }
    public getvisitemonth(month:string){
      return this.http.get(this.baseUrl+'getvisitemonth/'+month)
    }
  }

