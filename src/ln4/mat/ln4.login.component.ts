import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ln4Manager } from '../ln4.Manager';
import { ln4A2Connect } from '../ln4.A2Connect';
import { ln4Map } from '../ln4.Map';
import { ln4Angular2 } from '../ln4.Angular2';
import { ln4BaseComponent } from '../ln4.BaseComp';
@Component({
  selector: 'login-ln4',
  templateUrl: 'ln4.login.component.html',
})
export class ln4MatLoginComponent  extends ln4BaseComponent {
  public user = '';
  public pass = '';
  public chkpass = '';
  public email = '';
  public realname = '';
  public message = '';
  public regstyle = false;
  public lgnstyle = true;
  public locality = 'net';
  constructor(
    public dialogRef: MatDialogRef<ln4MatLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      super();
     }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public LoginLabel(): string {
    return ln4Manager.GetInstance().translate('Login');
  }
  public RegLabel(): string {
    return ln4Manager.GetInstance().translate('Register');
  }
  public Login(): void {
    ln4A2Connect.LoginApi(this.user, this.pass);
  }
  public RegFlag(): boolean {
    let chk = false;

    if (this.pass === '') {
      this.message = 'Need check password';
    } else {
      chk = true;
    }
    if ((chk === true) && (this.user === '')) {
      chk = false;
      this.message = 'Need user';
    }
    if ((chk === true) && (this.user.length < 4)) {
      chk = false;
      this.message = 'User need to have min 4 chars';
    }
    if ((chk === true) && (this.pass.length < 6)) {
      chk = false;
      this.message = 'Pass need to have min 6 chars';
    }
    if ((chk === true) && (this.chkpass !== this.pass)) {
      chk = false;
      this.message = 'Password don\'t match';
    }
    if ((chk === true) && (this.email === '')) {
      chk = false;
      this.message = 'Need Email';
    }
    if ((chk === true) && (this.email.length < 6)) {
      chk = false;
      this.message = 'Need Vail Email';
    }
    if ((chk === true) && (this.realname === '')) {
      chk = false;
      this.message = 'Need RealName';
    }

    return chk;
  }
  public show_message(): string {
    return ln4Manager.GetInstance().translate(this.message);
  }
  public regpageStyle(): any {
    return this.regstyle;
  }
  public lgnpageStyle(): any {
    return this.lgnstyle;
  }
  public Register(): void {
    if (this.RegFlag() === false) {
      this.regstyle = true;
      this.lgnstyle = false;
    } else {
      this.message = 'wait server response..';
      const newuser: ln4Map = new ln4Map();
      newuser.set('UserAlias', this.user);
      newuser.set('UserCode', this.pass);
      newuser.set('RealName', this.realname);
      newuser.set('email', this.email);
      newuser.set('Locality', this.locality);
      ln4Angular2.eventGet('newuser', true).subscribe(
        (type) => {
          const ln4m = ln4Manager.GetInstance();
          const sts = ln4m.dataExport(type);
          ln4Angular2.msgInfo('newuser//START' + type);
          ln4Angular2.msgInfo('newuser//END' + type);
          if (sts == null) {
            this.message = ln4Manager.GetInstance().translate('Server Reject!');
          } else {
            if ('message' in sts) {
              if (sts.message === 'Done') {
                this.message = ln4Manager.GetInstance().translate('Registred!!');
                this.dialogRef.close();
              } else if (('' + sts.message).indexOf('Error') >= 0) {
                this.message = ln4Manager.GetInstance().translate('Server Reject!!');
              } else {
                this.message = ln4Manager.GetInstance().translate(sts.message);
              }
            } else {
              this.message = ln4Manager.GetInstance().translate('Server Reject!!');
            }
          }
        });
      let docid: number = Math.trunc(new Date().getTime() / 1000);
      docid = docid - 943920000;
      ln4A2Connect.ForumSaveApi(4000, docid, 'ForumAlias', newuser, 'newuser');
    }
  }
}
