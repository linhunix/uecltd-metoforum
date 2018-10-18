import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ln4Manager } from '../ln4.Manager';
import { ln4A2Connect } from '../ln4.A2Connect';
import { ln4Map } from '../ln4.Map';
import { ln4Angular2 } from '../ln4.Angular2';
@Component({
  selector: 'login-ln4',
  templateUrl: 'ln4.login.component.html',
})
export class ln4MatLoginComponent {
  private user: string="";
  private pass: string="";
  private chkpass: string="";
  private email: string="";
  private realname: string="";
  private message:string="";
  private regstyle:boolean=false;
  private lgnstyle:boolean=true;
  constructor(
    public dialogRef: MatDialogRef<ln4MatLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
    this.dialogRef.close();
  }
  public LoginLabel():string {
    return ln4Manager.GetInstance().translate("Login");
  }
  public RegLabel():string {
    return ln4Manager.GetInstance().translate("register");
  }
  public Login():void {
    ln4A2Connect.LoginApi(this.user, this.pass);
  }
  public RegFlag():boolean{
    let chk:boolean=false;
    if (this.pass==""){
      this.message="Need check password";
    }else{
      chk=true;
    }
    if ((chk==true)&&(this.chkpass!=this.pass)){
      chk=false;
      this.message="Password don't match";
    }
    if ((chk==true)&&(this.email=="")){
      chk=false;
      this.message="Need Email";
    }
    if ((chk==true)&&(this.realname=="")){
      chk=false;
      this.message="Need RealName";
    }
    if ((chk==true)&&(this.user=="")){
      chk=false;
      this.message="Need user";
    }
    return chk;
  }
  public show_message():string{
    return ln4Manager.GetInstance().translate(this.message);
  }
  public regpageStyle():any{
    return this.regstyle;
  }
  public lgnpageStyle():any{
    return this.lgnstyle;
  }
  public Register():void{
    if (this.RegFlag()==false){
      this.regstyle=true;
      this.lgnstyle=false;
    }else{
      this.message="wait server response..";
      let newuser:ln4Map=new ln4Map();
      newuser.set("UserAlias",this.user);
      newuser.set("UserCode",this.pass);
      newuser.set("RealName",this.realname);
      newuser.set("email",this.email);
      ln4Angular2.eventGet("newuser",true).subscribe(
      (type)=>{
        let sts=ln4Manager.GetInstance().dataExport(type);
        if (sts==null){
          this.dialogRef.close();
        }else{
          this.message=ln4Manager.GetInstance().translate(sts);
        }
      });
      ln4A2Connect.ForumSaveApi(4000, new Date().getTime(),"UserAlias",newuser,"newuser");    
    }
  }
}
