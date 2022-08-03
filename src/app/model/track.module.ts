export class Track{
    id: number;
    temps: String;
    lat: String;
    lng: String;
  
    constructor(id: number, temps: String, lat: String,lng: String){
      this.id = id;
      this.temps = temps;
      this.lat = lat;
      this.lng = lng;
    }
}