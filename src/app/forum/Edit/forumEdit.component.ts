import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ln4Manager } from 'src/ln4/ln4.Manager';
import { ln4BaseComponent } from 'src/ln4/ln4.BaseComp';
import { ln4Angular2 } from 'src/ln4/ln4.Angular2';
import { ln4A2Connect } from 'src/ln4/ln4.A2Connect';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
    selector: 'forumEdit-ln4',
    templateUrl: "forumEdit.component.html",
    styleUrls: ['forumEdit.component.css']
})
export class ForumEditorComponent extends ln4BaseComponent {
    public message: string = "";
    public action: string = "add";
    public forumList: string[] = [];
    public isreadonly: boolean = true;

    constructor(
        public dialogRef: MatDialogRef<ForumEditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        super();
        ln4Angular2.eventGet("Dialog", true).subscribe(
            (info: string) => {
                let rdata: any = ln4Manager.GetInstance().dataExport("Dialog");
                this.loaddata(rdata);
            }
        )
    }
    /**
     * Load data
     * @param mydata 
     */
    public loaddata(mydata: any): void {
        //if (ln4Angular2.isDebug()) {
        console.log("editor Component");
        console.log(mydata);
        //}
        if (mydata == null) {
            ln4Angular2.msgWarning("No Data for editor!!!");
            this.onNoClick();
            return;
        }
        if ("Action" in mydata) {
            this.action = mydata.Action;
        }
        if ("forumList" in mydata) {
            this.forumList = mydata.forumList;
        }
        if ("forumData" in mydata) {
            this.data = mydata.forumData;
        }
        let newdata: any = {
            lst: ln4Manager.GetInstance().dateToday(),
            lun: this.getProfile("UserName"),
            lgr: this.getProfile("GroupName"),
            dsc: "",
            lvl: 0,
            lbl: "",
            sbj: "",
            lps: "net",
            cat: ""
        };
        if (this.data == null) {
            this.action = 'new';
            this.data = newdata;
        }
        if (this.data.cat == null) {
            this.action = 'new';
            this.data = newdata;
        }
        switch (this.action) {
            case "new":
                newdata.cat = this.data.cat;
                newdata.lvl = 1;
                newdata.catid = 4401;
                newdata.docid = ln4A2Connect.newDocid();
                break;
            case "add":
                newdata.cat = this.data.cat;
                newdata.lbl = this.data.lbl;
                newdata.lvl = 2;
                newdata.catid = this.data.catid;
                newdata.name = this.data.name;
                newdata.docid = ln4A2Connect.newDocid();
                break;
            case "reply":
            case "replay":
                this.isreadonly = false;
                newdata.lvl = 3;
                newdata.cat = this.data.cat;
                newdata.lbl = this.data.lbl;
                newdata.sbj = this.data.sbj;
                newdata.catid = this.data.docid;
                newdata.docid = ln4A2Connect.newDocid();
                newdata.name = this.data.name;
                break;
            case "edit":
                if (newdata.lgr == "G.4000") {
                    if (newdata.lun != this.data.lun) {
                        this.onNoClick();
                        break;
                    }
                }
                newdata.cat = this.data.cat;
                newdata.lbl = this.data.lbl;
                newdata.sbj = this.data.sbj;
                newdata.lps = this.data.lps;
                newdata.dsc = this.data.dsc;
                newdata.lvl = this.data.lvl;
                newdata.docid = this.data.docid;
                newdata.catid = this.data.catid;
                newdata.name = this.data.name;
                break;
            case "canc":
                if (newdata.lgr == "G.4000") {
                    if (newdata.lun != this.data.lun) {
                        this.onNoClick();
                        break;
                    }
                }
                newdata.cat = this.data.cat;
                newdata.lbl = this.data.lbl;
                newdata.sbj = this.data.sbj;
                newdata.lps = this.data.lps;
                newdata.dsc = this.data.dsc;
                newdata.lvl = this.data.lvl;
                newdata.docid = this.data.docid;
                newdata.catid = this.data.catid;
                newdata.name = this.data.name;
                if (confirm(this.Translate("Are you sure to delete?"))) {
                    ln4A2Connect.ForumCancApi(this.data.catid, this.data.docid, this.data.name, "forum-message");
                    this.onNoClick();
                    break;
                }
                break;
        }
        this.data = newdata;

    }
    public editcfg(): AngularEditorConfig {
        let updurl: string = this.getCfg("serverurl") + "/" + this.getProfile("UserSess") + "/upload/"
        let edtcfg: AngularEditorConfig = {
            editable: true,
            spellcheck: true,
            height: '10rem',
            minHeight: '5rem',
            placeholder: 'Enter text here...',
            translate: 'no',
            uploadUrl: updurl,
            customClasses: [
                {
                    name: "quote",
                    class: "quote",
                },
                {
                    name: 'redText',
                    class: 'redText'
                },
                {
                    name: "titleText",
                    class: "titleText",
                    tag: "h1",
                },
            ]
        };
        return edtcfg;
    }
    public isro(): boolean {
        return this.isreadonly;
    }
    /**
     * Closse on click 
     */
    public onNoClick(): void {
        this.dialogRef.close();
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
    public Check(): boolean {
        this.scopeIn.fromAny(this.data);
        return true;
    }
    public isEdit(): boolean {
        console.log(this.data);
        if (this.data != null) {
            if ("lun" in this.data) {
                return true;
            }
        }
        return false;
    }
    /**
     * 
     */
    public Save(): boolean {
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
        console.log(this.data);
        ln4A2Connect.ForumSaveApi(this.data.catid, this.data.docid, "ForumMessage", this.scopeIn, "forum-message");
        return true;
    }
}