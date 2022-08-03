import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

constructor(private http:HttpClient ) {}

    private baseUrl='http://localhost:8000/api/';
    
    public add(form:any){
      const header=new HttpHeaders;
      return this.http.post<any>(this.baseUrl+'add/',form)
    }
  
      public getChauffeurs(){return this.http.get(this.baseUrl+'show')}
      public getChauffeursdispo(){return this.http.get(this.baseUrl+'chauffeursdispo')}

      public deleteChauffeurs(id:any){return this.http.delete(this.baseUrl+'delete/'+id)}
      public getChauffByID(id:any){return this.http.get(this.baseUrl+'getChauffeur/'+id)}
      public updateChauffeur(id:any,form:any){return this.http.post(this.baseUrl+'UpdateChauffeur/'+id,form)}
      public chercher(key) {
        return this.http.get(this.baseUrl+'chercherchauffeur/'+key)
      }

      public modifierpasswordprofile(id:any,form:any){
        return this.http.post(this.baseUrl+'modifierpasswordprofile/'+id,form)
      }
    }
