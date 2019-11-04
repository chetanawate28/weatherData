import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IForecast } from '../forecast';
import { Observable } from 'rxjs';
import {clsGlobal} from '../common/globalConstant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private url : string ="/assets/data/weather.json";
  private url : string = clsGlobal.virtualUrl + "login";
  constructor(private http: HttpClient) { }

  login(userData): Observable<IForecast[]>{   
      debugger; 
    let body = userData;     
    return this.http.post<IForecast[]>(this.url,body);  
  }
}
