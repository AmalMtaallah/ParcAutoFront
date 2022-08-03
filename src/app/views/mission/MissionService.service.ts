import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NominatimResponse } from '../../model/nominatim.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  constructor(private http:HttpClient ) {}
  private tokenMapBox='pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A'
  private baseUrl='http://localhost:8000/api/';
  public addMission(id:any,form:any){
    const header=new HttpHeaders;
    return this.http.post<any>(this.baseUrl+'addMission/'+id,form)}
 public validateMission(form:any){
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return this.http.post<any>(this.baseUrl+'DateMissionValidation/',form)}

   public getmissions(){return this.http.get(this.baseUrl+'AllMission')}
   //public getdestination(){return this.http.get(this.baseUrl+'AllDestination')}
  public deleteMission(id:any){return this.http.delete(this.baseUrl+'DeleteMission/'+id)}
  public getMissionByID(id:any){return this.http.get(this.baseUrl+'getMission/'+id)}
   // public Coordonate(id:any){return this.http.get('https://nominatim.openstreetmap.org/search?format=json&limit=3&q='+id)}
   addressLookup(req?: any): Observable<NominatimResponse[]> {
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${req}`;
    return this.http
      .get(url).pipe(
        map((data: any[]) => data.map((item: any) => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name
          ))
        )
      )
  }
  addressLookup2(req?: any){
    return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req}.json?types=place%2Cpostcode%2Caddress&access_token=`+this.tokenMapBox)
  }
tracking(coords?: any){
 
    return this.http.get(`https://api.mapbox.com/directions/v5/mapbox/cycling/10.189806158733802,36.871264020184924;10.191382341148426,36.86968784970251?geometries=geojson&access_token=pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A`)

  }
  matching(long1?: any,lat1?: any,long2?: any,lat2?: any){
 
    return  this.http.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${long1},${lat1};${long2},${lat2}?geometries=geojson&access_token=pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A`)

  }
  TimeParcours(long1?: any,lat1?: any,long2?: any,lat2?: any){
   
    return this.http.get(` https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${long1},${lat1};${long2},${lat2}.json?access_token=`+this.tokenMapBox)

  }
  public updateMission(id:any,form:any){return this.http.post(this.baseUrl+'updateMission/'+id,form)}
  public deleteGeofence(id:any){
    const header=new HttpHeaders;
    return this.http.delete<any>(this.baseUrl+'deleteGeofence/'+id)
  }

public sendSmsNotificaition(mat,chauf){return this.http.get(this.baseUrl+'send-sms-notification/'+mat+'/'+chauf)}


public addGeofence(form:any){
  const header=new HttpHeaders;
  return this.http.post<any>(this.baseUrl+'addGeogence/',form)
}

public vehiculelivecart(){
  return this.http.get(this.baseUrl+'vehiculelivecart/')}

getnotificationbyid(id:any){
  return this.http.get(this.baseUrl+'selectnotificationbyid/'+id)

}
//get nbr notification de chaque chauffeur
public nbrnot(id:any){
  return this.http.get(this.baseUrl+'nbrnotification/'+id)}


//envoie des alertes
public envoiealert(mat:any,chauf:any){
  return this.http.post(this.baseUrl+'envoiealerte/'+mat+'/'+chauf,null)}
  
  public envoiealerte2(msg:any){
    return this.http.post(this.baseUrl+'envoiealertedeux/'+msg,null)}
  

//afficher alertes
public getalertes(){
  return this.http.get(this.baseUrl+'getalertes/')}

//nbr des alertes  
public nbralertes(){
  return this.http.get(this.baseUrl+'nbalertes/')}

  //get notification admin
  public getnotfadmin(){
    return this.http.get(this.baseUrl+'getnotificationadmin/')}
    public nbrnotfadmin(){
      return this.http.get(this.baseUrl+'nbnotfadmin/')}

      public vidangeNotif(ids:any){ return this.http.get(this.baseUrl+'notifVidange/'+ids)}
      public notifChangementPneux(ids:any){ return this.http.get(this.baseUrl+'notifChangementPneux/'+ids)}
      public AllTerminatedMission(){ return this.http.get(this.baseUrl+'AllTerminatedMission')}
      public setTerminatedMission(distance:any,id:any,form:any){ return this.http.post(this.baseUrl+'setTerminatedMission/'+distance+'/'+id,form)}
      public getmissionadminbydatechoisie(date:any){
        return this.http.get(this.baseUrl+'getmissionadminbydatechoisi/'+date)
      }

      Routes(long1?: any,lat1?: any,long2?: any,lat2?: any){
        return this.http.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${long1},${lat1};${long2},${lat2}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoibXRhYWxsYWhhbWFsIiwiYSI6ImNsMGduMXE2YTAwYW4zam1vcHNlZGtvczQifQ.OS5VT9dgW-jpYgLmqoTR2A`)
      }

public getGeofence(id:any){
  const header=new HttpHeaders;
  return this.http.get<any>(this.baseUrl+'getGeogence/'+id)
}
  

public vehiculeTraking(id: any){
  return this.http.get(this.baseUrl+'vehiculeTraking/'+id)}



  public AllMissionEnCours(){
    return this.http.get(this.baseUrl+'missionEncours/')}
  
    public SendSMS(msg:any){
      console.log(msg);
      return this.http.get(this.baseUrl+'sendSmsNotificaition/'+msg)}
      public lancer(id:any){
        return this.http.post(this.baseUrl+'lancermission/'+id,null)
      }
      public getdatenow(){return this.http.get(this.baseUrl+'getdateactuelle/')}

      public missionbydatechoisi(date){
        return this.http.get(this.baseUrl+'getmissionbydatechoisi/'+date)
      }
      public missionbydate(){return this.http.get(this.baseUrl+'getmissionbydateactuelle/')}

     
      public getmissioncetsemaine(){
        return this.http.get(this.baseUrl+'getmissionsdecetsemaine/')
      }
      
      public getmissionsprochweek(){
        return this.http.get(this.baseUrl+'getmissionsdelasemaproch/')
      }
    
      public getmissionsdeuxsemaines(){
        return this.http.get(this.baseUrl+'getmissionsdeuxsemainesprochaine/')
      }
      public chercher(key: any){
        return this.http.get(this.baseUrl+'chercher/'+key)}
        public chercherterminated(key: any){
          return this.http.get(this.baseUrl+'chercher/'+key)}
}