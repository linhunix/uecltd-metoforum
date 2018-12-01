import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ln4Manager } from 'src/ln4/ln4.Manager';
import { ln4A2SimpleComp } from 'src/ln4/ln4.A2SimpleComp';
import { ln4BaseComponent } from 'src/ln4/ln4.BaseComp';
import { ln4Angular2 } from 'src/ln4/ln4.Angular2';
import { EventEmitter } from 'protractor';
import { ln4Map } from 'src/ln4/ln4.Map';
import { ln4A2Connect } from 'src/ln4/ln4.A2Connect';
@Component({
    selector: 'editor-ln4',
    templateUrl: "edit.component.html",
})
export class EditorComponent extends ln4BaseComponent {
    public action:string = "Add";
    public forum: string = "";
    public forumList: string[] = [];
    public topic: string = "";
    public todayDate = new Date();
    public catid: number = 4401;
    public docid: number = ln4A2Connect.newDocid();
    public topicR: boolean = false;
    public topicLevel: number = 1;
    public from: string = "";
    public fromG: string = "";
    public subject: string = "";
    public content: string = "";
    public area: string = "";
    public message: string = "";

    public loaddata(mydata: any): void {
        this.from = ln4Manager.GetInstance().profileGet("UserName");
        this.fromG = ln4Manager.GetInstance().profileGet("GroupName");
        if (mydata == null) {
            mydata = ln4Manager.GetInstance().dataExport("Dialog");
        }
        if (ln4Angular2.isDebug()) {
            console.log("editor Component");
            console.log(mydata);
        }
        if (mydata != null) {
            if ("forumList" in mydata) {
                this.forumList = mydata.forumList;
                this.forum = mydata.forumList[0];
            }
            if ("forum" in mydata) {
                this.forum = mydata.forum;
            }
            if ("subject" in mydata) {
                this.subject = mydata.subject;
            }
            if ("topic" in mydata) {
                this.topic = mydata.topic;
            }
            if ("topicR" in mydata) {
                this.topicR = mydata.topicR;
            }
            if ("catid" in mydata) {
                this.catid = mydata.catid;
            }
            if ("docid" in mydata) {
                this.docid = mydata.docid;
            }
            if ("content" in mydata) {
                this.content = mydata.content;
            }
            if ("level" in mydata) {
                this.topicLevel = mydata.level;
            }
            if ("area" in mydata) {
                this.area = mydata.area;
            }
        }
    }
    constructor(
        public dialogRef: MatDialogRef<EditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        super();
        this.loaddata(data);
        ln4Angular2.eventGet("Dialog", true).subscribe(
            (info: string) => {
                this.data = ln4Manager.GetInstance().dataExport("Dialog");
                this.loaddata(this.data);
            }
        )
    }
    dateToday(): string {
        return this.todayDate.getFullYear() + '-' + ((this.todayDate.getMonth() + 1)) + '-' + this.todayDate.getDate() + ' ' + this.todayDate.getHours() + ':' + this.todayDate.getMinutes() + ':' + this.todayDate.getSeconds();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    LoginLabel() {
        return ln4Manager.GetInstance().translate("Login");
    }
    Save(): void {
        this.message = "wait server response..";
        let newmsg: ln4Map = new ln4Map();
        newmsg.set("cat", this.forum);
        newmsg.set("lbl", this.topic);
        newmsg.set("sbj", this.subject);
        newmsg.set("catid", this.catid);
        newmsg.set("lvl", this.topicLevel);
        newmsg.set("dsc", this.content);
        newmsg.set("lps", this.content);
        newmsg.set("lun", this.from);
        newmsg.set("lgr", this.fromG);
        newmsg.set("lps", this.area);
        newmsg.set("lst", this.dateToday());

        ln4Angular2.eventGet("forum-message", true).subscribe(
            (type) => {
                let sts = ln4Manager.GetInstance().dataExport(type);
                ln4Angular2.msgInfo("forum-message//START" + type);
                console.log(sts);
                ln4Angular2.msgInfo("forum-message//END" + type);
                if (sts == null) {
                    this.message = ln4Manager.GetInstance().translate("Server Reject!");
                } else {
                    if ("message" in sts) {
                        if (sts.message == "Done") {
                            this.message = ln4Manager.GetInstance().translate("Registred!!");
                            this.dialogRef.close();
                        } else if (("" + sts.message).indexOf("Error") >= 0) {
                            this.message = ln4Manager.GetInstance().translate("Server Reject!!");
                        } else {
                            this.message = ln4Manager.GetInstance().translate(sts.message);
                        }
                    } else {
                        this.message = ln4Manager.GetInstance().translate("Server Reject!!");
                    }
                }
            });
        
        newmsg.set("docid", this.docid);
        ln4A2Connect.ForumSaveApi(this.catid, this.docid, "ForumMessage", newmsg, "forum-message");
    }
}
