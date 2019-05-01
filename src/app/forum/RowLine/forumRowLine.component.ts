import { Component, Input } from "@angular/core";
import { ln4A2MatComponent } from "src/ln4/mat/ln4.A2Mat.component";
import { ln4Manager } from "src/ln4/ln4.Manager";
import { ln4Map } from "src/ln4/ln4.Map";
import { MatDialog } from "@angular/material";
@Component({
  selector: "forumRowLine-ln4",
  templateUrl: "./forumRowLine.component.html",
  styleUrls: ["./forumRowLine.component.css"]
})
export class ForumRowLineComponent extends ln4A2MatComponent {
  public step: number = 1;
  @Input("RowItem") public itm: any;
  @Input("LstItem") public lst: any;
  public get topics(): any[] {
    return ln4Map.Load(this.itm.topics).sort("docid");
  }
  constructor(dialog: MatDialog) {
    super(true, true, dialog);
  }
  public checkitm(itm: any): boolean {
    if (itm != null) {
      if ("lvl" in itm) {
        return true;
      }
    }
    return false;
  }
  /**
   * Removetags forum row line component
   * @param [value]
   * @returns removetag
   */
  public removetag(value?: string): string {
    let valres="";
    if (value != null) {
      let valin=""+value;
      let i=0;
      for (let v of valin.split('')) {
        if (i > 1){
          valres =valres+v;
        }
        i++;
      }
    }
    return valres;
  }
    /**
   * removesec forum row line component
   * @param [value]
   * @returns removetag
   */
  public removesec(value?: string): string {
    let valres="";
    if (value != null) {
      let valin=""+value;
      valres=valin.split(' ')[0];
    }
    return valres;
  }

  public removedate(value?: string): string {
    let valres="";
    if (value != null) {
      let valin=""+value;
      valres=valin.split(' ')[1];
    }
    return valres;
  }
  /**
   * Removedate forum row line component
   * @param [value]
   * @returns removetag
   */
  public removedate(value?: string): string {
    let valres="";
    if (value != null) {
      let valin=""+value;
      valres=valin.split(' ')[1];
    }
    return valres;
  }

  public Reply() {
    this.authdialog("ForumEditorComponent", {
      Action: "replay",
      forumList: this.lst,
      forumData: this.itm
    });
  }
  public New() {
    this.authdialog("ForumEditorComponent", {
      Action: "new",
      forumList: this.lst,
      forumData: this.itm
    });
  }
  public Add() {
    this.authdialog("ForumEditorComponent", {
      Action: "add",
      forumList: this.lst,
      forumData: this.itm
    });
  }
  public Change() {
    this.authdialog("ForumEditorComponent", {
      Action: "edit",
      forumList: this.lst,
      forumData: this.itm
    });
  }
  public Delete() {
    this.authdialog("ForumEditorComponent", {
      Action: "canc",
      forumList: this.lst,
      forumData: this.itm
    });
  }
  public Share() {}
}
