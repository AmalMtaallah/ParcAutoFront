import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashchaufService {

  constructor(private http:HttpClient) { }
  private baseUrl='http://localhost:8000/api/';
 // public getmissions(id:any){return this.http.get(this.baseUrl+'getmissionchauffeur/'+id)}
  public getdatenow(){return this.http.get(this.baseUrl+'getdateactuelle/')}
  public missionbydate(id:any){return this.http.get(this.baseUrl+'getmissionbydateactuelle/'+id)}
  public missionbydatechoisi(id:any,date){
    return this.http.get(this.baseUrl+'getmissionbydatechoisi/'+id+'/'+date)
  }
  public nbchauffeur(){
    return this.http.get(this.baseUrl+'nbchauffeur')
  }
  public nbvehicules(){
    return this.http.get(this.baseUrl+'nbvehicules')
  }
  public chercher(key,id) {
    return this.http.get(this.baseUrl+'chercher/'+key+'/'+id)
  }
  
  public lancer(id:any){
    return this.http.post(this.baseUrl+'lancermission/'+id,null)
  }

  //hisotrique des mission
  public missiontermineee(id:any){
    return this.http.get(this.baseUrl+'missiontermine/'+id)

  }

  public nbvehienlivraison(){
    return this.http.get(this.baseUrl+'nbvehiculesencourslivr/')
  }
  public getfivelatestusers(){
    return this.http.get(this.baseUrl+'dernierschauffeur/')
  }
  public getchaufeurpermis(){
    return this.http.get(this.baseUrl+'getchaufpermis/')
  }
  

  public totalmission(){
    return this.http.get(this.baseUrl+'totalmission/')
  }

  public nbmissionparadress(){
    return this.http.get(this.baseUrl+'nbdestination/')
  }
 
  public totaldestination(){
    return this.http.get(this.baseUrl+'totaldestination/')}
    
    public nbmissionparmois(){
      return this.http.get(this.baseUrl+'nbmissionparmois/')}

      public getmissioncetsemaine(id:any){
        return this.http.get(this.baseUrl+'getmissionsdecetsemaine/'+id)
      }
      
      public getmissionsprochweek(id:any){
        return this.http.get(this.baseUrl+'getmissionsdelasemaproch/'+id)
      }
    
      public getmissionsdeuxsemaines(id:any){
        return this.http.get(this.baseUrl+'getmissionsdeuxsemainesprochaine/'+id)
      }
      
      public getmissionencours(id:any){
        return this.http.get(this.baseUrl+'getmissionencours/'+id)
        
      }
      public allterminatedmiss(){
        return this.http.get(this.baseUrl+'allterminatedmiss/')
        
      }
      
      public calenderMission(id:any){
        return this.http.get(this.baseUrl+'missionCalender/'+id)
      }

      public ajouterpresencechauf(id:any){
        return this.http.get(this.baseUrl+'addpresent/'+id)
      }
      
}
