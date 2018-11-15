import { ln4A2SimpleComp } from "../ln4.A2SimpleComp";
import { MatDialog, MatDialogRef } from "@angular/material";
import { ln4Map } from "../ln4.Map";
import { ComponentType } from "@angular/core/src/render3";
import { TemplateRef, ComponentFactoryResolver } from "@angular/core";
import { ln4Angular2 } from "../ln4.Angular2";
import { ln4Manager } from "../ln4.Manager";
import { EventEmitter } from "protractor";

export class ln4A2MatComponent extends ln4A2SimpleComp {
    /**
     * define the component used to call this dialog
     */
    private mydialog: ComponentType<any> | TemplateRef<any>;
    /**
     *  Dialog reference 
     */
    private refdialog: MatDialogRef<any>;
    /**
     * auto iniectable 
     * @param boot_reload 
     * @param boot_subscribe 
     * @param dialog 
     */
    constructor(boot_reload: boolean = true, boot_subscribe: boolean = true, public dialog: MatDialog) {
        super(boot_reload, boot_subscribe);
        this.onaction().subscribe(
            typeaction => {
                if (typeaction == "OpenDialog") {
                    this.openDialogEasy();
                }
            }
        );
    }
    /**
     * add the dialog object to be open when is request
     * @param dialogObject 
     */
    public setDialog(dialogObject: ComponentType<any> | TemplateRef<any>) {
        this.mydialog = dialogObject;
    }
    /**
    * add the dialog object to be open when is request
    * @param dialogObject 
    */
    public setDialogClassName(dialogclassname: string) {
        let dialogObject: ComponentType<any> | TemplateRef<any>;
        dialogObject = ln4Angular2.getCompLib(dialogclassname);
        if (dialogObject == null) {
            ln4Angular2.msgWarning(dialogclassname + " is null!!");
        }
        this.setDialog(dialogObject);
    }
    /**
     * Close the dialog
     */
    public closeDialog() {
        if (this.refdialog != null) {
            this.refdialog.close();
            this.refdialog = null;
        }
    }
    /**
     * check if dialog is open or not 
     * @returns boolean is true has dialog 
     * 
     */
    public isDialog(): boolean {
        if (this.refdialog != null) {
            return true;
        }
        return false;
    }
    /**
     * Fast open dialog 
     * @returns booean if the dialog open true else false
     */
    public openDialogEasy(): boolean {
        if (this.mydialog != null) {
            let data: ln4Map = new ln4Map();
            data.fromAny(this.myaction);
            this.openDialog(this.mydialog, data);
            return true;
        }
        return false;
    }
    /**
     * Open the dlialog 
     * @param dialogObject 
     * @param data 
     */
    public openDialog(dialogObject: ComponentType<any> | TemplateRef<any>, data: ln4Map) {
        if (ln4Angular2.isDebug()) {
            console.log(data);
            console.log(data.toJson());
        }
        this.refdialog = this.dialog.open(dialogObject, data.toJson());
        ln4Manager.GetInstance().dataImport("Dialog",data.toJson());
        ln4Angular2.eventGet("Dialog",true).emit("load");
        this.refdialog.afterClosed().subscribe(result => {
            this.doaction("onCloseDialog", result);
        });
        this.onaction().subscribe(
            typeaction => {
                if ((typeaction == "CloseDialog") && (this.refdialog != null)) {
                    this.closeDialog();
                }
            }
        );
    }
    /**
     * Close prevous dialog and open new one 
     * @param dlgname 
     * @param dlgvar 
     * @returns boolean is work or not
     */
    calldialog(dlgname: string, dlgvar: any): boolean {
        if (this.isDialog()) {
            this.closeDialog();
        }
        this.setDialogClassName(dlgname);
        this.myaction = dlgvar;
        return this.openDialogEasy();
    }
    /**
     * Autorized first and only if is auth allow the form 
     * @param dlgname 
     * @param dlgvar 
     */
    authdialog(dlgname: string, dlgvar: any): boolean {
        let authok: boolean = false;
        if (ln4Manager.GetInstance().profileGet("UserSess") == null) {
            ln4Angular2.msgDebug("Is Guest!");
            authok = this.calldialog('ln4MatLoginComponent', {});
            if (authok == false) {
                alert(ln4Manager.GetInstance().translate("Not Allow!"));
            }
            return authok;
        }
        return this.calldialog(dlgname, dlgvar);
    }
}