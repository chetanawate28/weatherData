import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogMsg } from '../DialogMsg';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
message:string="";

  ngOnInit(): void {
  //    throw new Error("Method not implemented.");
  }

  constructor(
    public dialogRef: MatDialogRef<DialogueComponent>,  
    @Inject(MAT_DIALOG_DATA) public data:DialogMsg) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
