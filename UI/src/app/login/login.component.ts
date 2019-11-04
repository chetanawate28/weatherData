import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {clsGlobal} from '../common/globalConstant';
import { LoginService } from './login.sevice';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogueComponent } from '../dialogue/dialogue.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  loginResponse:any = [];
  constructor(private router:Router, private loginService : LoginService,private dialog : MatDialog) { }

  ngOnInit() {
  }

  loginUser(){
    let userData = {
      username:this.username,
      password:this.password
    }

    this.loginService.login(userData)
    .subscribe(data =>
      {
         this.loginResponse = data;
         if(this.loginResponse.status){
           clsGlobal.authToken = this.loginResponse.result;
           this.router.navigate(['forecast']);
         }            
         else
             this.openDialog(this.loginResponse.result);
          //  console.log(this.loginResponse.result);
      });
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
}