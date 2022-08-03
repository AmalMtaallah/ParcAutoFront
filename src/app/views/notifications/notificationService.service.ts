import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
 
  constructor(private http:HttpClient ) {}

  private baseUrl='http://localhost:8000/api/';
  /*public add(form:any){
    const header=new HttpHeaders;
    return this.http.post<any>(this.baseUrl+'addvehicule/',form)}*/

    public getNotification(){return this.http.get(this.baseUrl+'AllNotification')}
    public openNotif(){return this.http.get(this.baseUrl+'openNotif')
  }
    openAlert(){
      return this.http.get(this.baseUrl+'openalertes')
    }
    openRappel(){
      return this.http.get(this.baseUrl+'openrappel')
    }
    
    public deleteNotif(id:any){return this.http.delete(this.baseUrl+'suppNotif/'+id)}
   public SuppArchive(){return this.http.get(this.baseUrl+'SuppArchive')}
    /*public updateVehicule(id:any,form:any){return this.http.post(this.baseUrl+'updatevehicule/'+id,form)}

    
    public notifAssurance(){return this.http.get(this.baseUrl+'notifAssurance')}
    public VisiteTechNotif(){return this.http.get(this.baseUrl+'VisiteTechNotif')}*/

    public getrappel(){
    return this.http.get(this.baseUrl+'getrappel')
    }

    public getnbrrappel(){
      return this.http.get(this.baseUrl+'getnbrappel')
      }
      public AllAlertes(){
        return this.http.get(this.baseUrl+'AllAlertes')
        }

      
}

