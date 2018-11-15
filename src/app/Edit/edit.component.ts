import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ln4Manager } from 'src/ln4/ln4.Manager';
import { ln4A2SimpleComp } from 'src/ln4/ln4.A2SimpleComp';
import { ln4BaseComponent } from 'src/ln4/ln4.BaseComp';
import { ln4Angular2 } from 'src/ln4/ln4.Angular2';
import { EventEmitter } from 'protractor';
@Component({
    selector: 'editor-ln4',
    templateUrl: "edit.component.html",
})
export class EditorComponent extends ln4BaseComponent {
    public forum: string = "";
    public forumList: string[] = [];
    public topic: string = "";
    public topicId: string = "";
    public topicR: string = "readonly";
    public from: string = "";
    public fromG: string = "";
    public subject: string = "";
    public content: string = "";
    public loaddata (mydata:any):void {
        this.from = ln4Manager.GetInstance().profileGet("UserName");
        this.fromG = ln4Manager.GetInstance().profileGet("GroupName");
        if (mydata==null){
            mydata=ln4Manager.GetInstance().dataExport("Dialog");
        }
        if (ln4Angular2.isDebug()) {
            console.log("editor Component");
            console.log(mydata);
        }
        if (mydata != null) {
            if ("forum" in mydata) {
                this.forum = mydata.forum;
            }
            if ("forumList" in mydata) {
                this.forumList = mydata.forumList;
            }
            if ("subject" in mydata) {
                this.subject = mydata.subject;
            }
            if ("topic" in mydata) {
                this.topic = mydata.topic;
            }
            if ("topicId" in mydata) {
                this.topicId = mydata.topicId;
            }
            if ("content" in mydata) {
                this.content = mydata.content;
            }
        }
    }
    constructor(
        public dialogRef: MatDialogRef<EditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        super();
        this.loaddata(data);
        ln4Angular2.eventGet("Dialog",true).subscribe(
            (info:string)=>{
                this.data=ln4Manager.GetInstance().dataExport("Dialog");
                this.loaddata(this.data);
            }
        )
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    LoginLabel() {
        return ln4Manager.GetInstance().translate("Login");
    }
}
