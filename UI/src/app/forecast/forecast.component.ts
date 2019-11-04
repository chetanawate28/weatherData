import { Component, OnInit } from '@angular/core';
import { ForecastService } from './forecast.service';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { MatDialog } from '../../../node_modules/@angular/material/dialog';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  name:string = '';
  weatherInfos: any = [];
  weatherForcastData: any=[];
  dateData: any = [];
  colSpanCount: number = 0;
  time:number = 3;
  //  weatherInfos = [
  //    {"code":1 ,"name":"kalyan"},
  //   { "code":2 , "name":"Thane" },
  //   {"code" :3 , "name" : "mumbra"},
  //   {"code":4 , "name" : "navi mumbai"},
  //   {"code": 5, "name": "andheri"} 
  // ];
  code: string;

  constructor(private _forecastService: ForecastService,public dialog:MatDialog) { }


  ngOnInit() {
  
  }

  getWeatherForcastData(){
    this.time = 3;
    this.colSpanCount = 0;
    this.weatherInfos = [];
    this.weatherForcastData = [];
    this.dateData = [];
    if(this.name){
      this._forecastService.getWeatherinfo(this.name)
      .subscribe(res => {
        let responseData: any = res;
        if (responseData.status) {
          this.weatherInfos = responseData.result;
  
          if(this.weatherInfos.cod!="200")
          {
            this.openDialog(this.weatherInfos.message);
          }
          else
          {
            this.weatherForcastData = this.weatherInfos.list;
          for (let i = 0; i < this.weatherForcastData.length; i++) {
            debugger;
            this.colSpanCount++;
            let splittedDate = this.weatherForcastData[i].dt_txt.split(' ');
            if (i == 0) {
              let data = {
                colSpanCount: this.colSpanCount,
                date: splittedDate[0]
              }
  
              this.dateData.push(data);
            }
            else {
              let filteredData = this.dateData.filter(s => (s.date == splittedDate[0]))
              if (filteredData.length == 0) {
                //this.dateData[this.dateData.length-1].colSpanCount = this.colSpanCount-1;
                this.colSpanCount = 1;
                let data = {
                  colSpanCount: this.colSpanCount,
                  date: splittedDate[0]
                }
                this.colSpanCount = 1;
                this.dateData.push(data);
              }
              else {
                this.dateData[this.dateData.length - 1].colSpanCount = this.colSpanCount;
              }
            }
            this.weatherForcastData[i].main.temp = parseInt(this.weatherForcastData[i].main.temp); 
            this.weatherForcastData[i].time = this.tConvert(splittedDate[1]);
          }
        }
        }
        else{
          this.openDialog(responseData.result);
        }
      });
    }   
  }

  openDialog(msg): void {
    const dialogRef = this.dialog.open(DialogueComponent, {
      width: '250px',
      data:{msg: msg}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }

   tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  debugger;
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time[0]+time[5]; // return adjusted time or original string
  }
}
