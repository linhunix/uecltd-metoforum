import { Component, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ln4Manager } from '../ln4.Manager';
@Component({
  selector: 'login-ln4',
  templateUrl: 'ln4.login.component.html',
})
export class ln4MatLoginComponent {
  constructor(
    public dialogRef: MatDialogRef<ln4MatLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
    loginLabel(){
      return ln4Manager.GetInstance().translate("Login");
    }
  }
