import { Component } from '@angular/core';
import { ln4Manager } from '../../ln4/ln4.Manager';
import { ln4Map } from '../../ln4/ln4.Map';
import { ln4Angular2 } from '../../ln4/ln4.Angular2';
import { ln4A2MatComponent } from 'src/ln4/mat/ln4.A2Mat.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'forum-ln4',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent extends ln4A2MatComponent {
  private frm: ln4Map;
  public frmlst : string[] = [];
  public initcfg() {
    this.frm = new ln4Map();
  }
  public preReload(source: ln4Map, type: string): ln4Map {
    if ((this.myId != null) && (this.frm.has(this.myId) == false)) {
      ln4Angular2.msgDebug("subscibe=" + this.myId);
      ln4Angular2.eventGet(this.myId, true).subscribe(
        (ltype: string) => {
          this.reload(ltype);
        });
      this.frm.set(this.myId, true);
    }
    if (type == "reload") {
      ln4Angular2.msgInfo("force Reload");
      this.frm = new ln4Map();
      this.frm.set(this.myId, true);
    }
    return source.returnOK();
  }
  public postReload(source: ln4Map, type: string): ln4Map {
    if (this.frm.has(type)) {
      let obj: ln4Map = new ln4Map();
      obj.fromAny(source.get("forumVals"));
      let vals = ln4Manager.GetInstance().dataExport(type);
      if (vals != null) {
        obj.setFromAny(type, vals);
      }
      source.set("forumVals", obj.toJson());
      this.frmlst = ln4Map.Load(source.get("forumVals")).keys();
    }
    console.log("Check Forum:" + this.myId + "/" + type);
    if (source.has("forums")) {
      source.get("forums").forEach((element: string) => {
        let formn = this.myId + "-" + element;
        let formu = "/assets/forum." + element + ".json";
        if (this.frm.has(formn) == false) {
          if (ln4Angular2.isDebug()) {
            console.log(formn);
            console.log(formu);
          }
          ln4Angular2.msgDebug("subscibe=" + formn);
          ln4Angular2.eventKill(formn);
          ln4Angular2.eventGet(formn, true).subscribe(
            (ltype: string) => {
              ln4Angular2.msgDebug("eventGet=" + this.myId + "/" + ltype);
              this.reload(ltype);
            }
          );
          ln4Angular2.callUrl(formn, formu, null, false);
          this.frm.set(formn, true);
        }
      });
    }
    // use to make config 
    return source.returnOK();
  }
  constructor(dialog: MatDialog) { 
    super(true,true,dialog);
  }
}
