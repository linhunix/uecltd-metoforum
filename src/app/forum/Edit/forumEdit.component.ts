import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ln4Manager } from 'src/ln4/ln4.Manager';
import { ln4BaseComponent } from 'src/ln4/ln4.BaseComp';
import { ln4Angular2 } from 'src/ln4/ln4.Angular2';
import { ln4A2Connect } from 'src/ln4/ln4.A2Connect';
@Component({
    selector: 'forumEdit-ln4',
    templateUrl: "forumEdit.component.html",
    styleUrls: ['forumEdit.component.css']
})
export class ForumEditorComponent extends ln4BaseComponent {
    private message: string = "";
    constructor(
        public dialogRef: MatDialogRef<ForumEditorComponent>,
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
    public loaddata(mydata: any): void {
        if (ln4Angular2.isDebug()) {
            console.log("editor Component");
            console.log(mydata);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    LoginLabel(): string {
        return this.Translate("Login");
    }
    /*
    newmsg.set("cat", this.forum);
    newmsg.set("lbl", this.topic);
    newmsg.set("sbj", this.subject);
    newmsg.set("catid", this.catid);
    newmsg.set("docid", this.docid);
    newmsg.set("lvl", this.topicLevel);
    newmsg.set("dsc", this.content);
    newmsg.set("lps", this.content);
    newmsg.set("lun", this.from);
    newmsg.set("lgr", this.fromG);
    newmsg.set("lps", this.area);
    newmsg.set("lst", this.dateToday());
    */
    Check() {
        this.scopeIn.fromAny(this.data);
        return true;
    }
    Save(): boolean {
        this.message = "wait server response..";
        if (!this.Check()) {
            return false;
        }
        ln4Angular2.eventGet("forum-message", true).subscribe(
            (type) => {
                ln4Angular2.msgInfo("forum-message//START" + type);
                let sts = this.getData(type);
                ln4Angular2.msgInfo("forum-message//END" + type);
                if (sts == null) {
                    this.message = this.Translate("Server Reject!");
                } else {
                    if ("message" in sts) {
                        if (sts.message == "Done") {
                            this.message = this.Translate("Registred!!");
                            this.dialogRef.close();
                        } else if (("" + sts.message).indexOf("Error") >= 0) {
                            this.message = this.Translate("Server Reject!!");
                        } else {
                            this.message = this.Translate(sts.message);
                        }
                    } else {
                        this.message = this.Translate("Server Reject!!");
                    }
                }
            });
        ln4A2Connect.ForumSaveApi(this.data.catid, this.data.docid, "ForumMessage", this.scopeIn, "forum-message");
        return true;
    }
}