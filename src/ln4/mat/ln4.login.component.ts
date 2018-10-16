import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ln4Manager } from '../ln4.Manager';
import { ln4A2Connect } from '../ln4.A2Connect';
@Component({
  selector: 'login-ln4',
  templateUrl: 'ln4.login.component.html',
})
export class ln4MatLoginComponent {
  private user: string;
  private pass: string;

  constructor(
    public dialogRef: MatDialogRef<ln4MatLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  LoginLabel() {
    return ln4Manager.GetInstance().translate("Login");
  }
  Login() {
    ln4A2Connect.LoginApi(this.user, this.pass);
  }
}
