import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IForecast } from '../forecast';
import { Observable } from 'rxjs';
import {clsGlobal} from '../common/globalConstant';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  //private url : string ="/assets/data/weather.json";
  private url : string ='';
  constructor(private http: HttpClient) { }

  getWeatherinfo(cityId){
    this.url = clsGlobal.virtualUrl+ "weatherForcast/" + cityId + "/json/metric"; 
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Authorization',''+clsGlobal.authToken);
    //headers.set('Authorization',clsGlobal.authToken);
    //headers.append('Authorization',''+clsGlobal.authToken);
    //let options = { headers:headers}
     
    return this.http.get(this.url,{headers});
  
  }
}
