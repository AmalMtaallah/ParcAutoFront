import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceVehiculeService {

  constructor(private http:HttpClient ) {}

  private baseUrl='http://localhost:8000/api/';
  public  add(form:any){
    return this.http.post<any>(this.baseUrl+'addvehicule/',form)}

    public getVehicules(){return this.http.get(this.baseUrl+'selectall')}
    public getVehiculesdispo(){return this.http.get(this.baseUrl+'vehiculesdispo')}
     public cherchervehicule(key){
      return this.http.get(this.baseUrl+'cherchervehicule/'+key)

     }
    public deleteVehicule(id:any){return this.http.delete(this.baseUrl+'deletevehicule/'+id)}
    public getVehiculeByID(id:any){return this.http.get(this.baseUrl+'getvehicule/'+id)}
    public updateVehicule(id:any,form:any){return this.http.post(this.baseUrl+'updatevehicule/'+id,form)}
    public notifAssurance(){return this.http.get(this.baseUrl+'notifAssurance')}
    public VisiteTechNotif(){return this.http.get(this.baseUrl+'VisiteTechNotif')}
}

