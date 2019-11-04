import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastService } from './forecast/forecast.service';
import { FilterPipe } from './filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from "@angular/material/icon";
import { LoginService } from './login/login.sevice';
import { DialogueComponent } from './dialogue/dialogue.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AutoRefreshComponent } from './auto-refresh/auto-refresh.component';


const appRoutes:Routes =[
 {
   path : '',
   component : LoginComponent
 },
 
  {
    path : 'forecast', component : ForecastComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForecastComponent,
    DialogueComponent,
    AutoRefreshComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule    
  ],
  entryComponents:[DialogueComponent],
  providers: [ForecastService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
