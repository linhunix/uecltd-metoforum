import { Component } from '@angular/core';
import { ln4Manager, ln4Manager_evtProfile } from '../../ln4/ln4.Manager';
import { ln4Map } from '../../ln4/ln4.Map';
import { ln4Angular2 } from '../../ln4/ln4.Angular2';
import { ln4A2MatComponent } from 'src/ln4/mat/ln4.A2Mat.component';
import { MatDialog } from '@angular/material';
import { ln4A2Connect } from 'src/ln4/ln4.A2Connect';
@Component({
  selector: 'forum-ln4',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent extends ln4A2MatComponent {
  private frm: ln4Map;
  public frmlst: string[] = [];
  public frmpg: number = 0;
  public initcfg() {
    this.frm = new ln4Map();
  }
  /**
   * override preload to get info about standard reload 
   */
  public preReload(source: ln4Map, type: string): ln4Map {
    if ((this.myId != null) && (this.frm.has(this.myId) == false)) {
      ln4Angular2.msgDebug("subscibe=" + this.myId);
      ln4Angular2.eventGet(this.myId, true).subscribe(
        (ltype: string) => {
          this.reload(ltype);
        });
      this.frm.set(this.myId, true);
    }
    if (type == "reload" || type == ln4Manager_evtProfile) {
      ln4Angular2.msgInfo("force Reload");
      this.frm = new ln4Map();
      this.frm.set(this.myId, true);
      source.delete("forumVals");
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
        //let formu = "/assets/forum." + element + ".json";
        if (this.frm.has(formn) == false) {
          if (ln4Angular2.isDebug()) {
            console.log(formn);
            //console.log(formu);
          }
          ln4Angular2.msgDebug("subscibe=" + formn);
          ln4Angular2.eventKill(formn);
          ln4Angular2.eventGet(formn, true).subscribe(
            (ltype: string) => {
              ln4Angular2.msgDebug("eventGet=" + this.myId + "/" + ltype);
              this.reload(ltype);
              if (this.scope.remote.forumVals[ltype] != null) {
                let cnttpc = 0
                let fval = this.scope.remote.forumVals[ltype];
                this.scope.remote.forumVals[ltype]["topics"] = [];
                Object.keys(fval).forEach(
                  (key: any) => {
                    let kval = fval[key];
                    if (kval.docid == kval.catid) {
                      if (kval.value != null) {
                        Object.keys(kval.value).forEach(
                          (subk: string) => {
                            this.scope.remote.forumVals[ltype][subk] = kval.value[subk];
                          }
                        );
                      }
                      this.scope.remote.forumVals[ltype].row = key;
                      this.scope.remote.forumVals[ltype].docid = kval.docid;
                      this.scope.remote.forumVals[ltype].catid = kval.catid;
                      this.scope.remote.forumVals[ltype].name = kval.name;
                      if ( this.scope.remote.forumVals[ltype].cat == null) {
                        this.scope.remote.forumVals[ltype].cat = ltype;
                      }
                    } else {
                      cnttpc++;
                      this.scope.remote.forumVals[ltype]["topics"][cnttpc] = kval.value;
                      this.scope.remote.forumVals[ltype]["topics"][cnttpc].row = key;
                      if (this.scope.remote.forumVals[ltype]["topics"][cnttpc].lvl == null) {
                        this.scope.remote.forumVals[ltype]["topics"][cnttpc].lvl = 0;
                      }
                      if (this.scope.remote.forumVals[ltype]["topics"][cnttpc].cat == null) {
                        this.scope.remote.forumVals[ltype]["topics"][cnttpc].cat = ltype;
                      }
                      this.scope.remote.forumVals[ltype].lun=this.scope.remote.forumVals[ltype]["topics"][cnttpc].lun;
                      this.scope.remote.forumVals[ltype].lps=this.scope.remote.forumVals[ltype]["topics"][cnttpc].lps;
                      this.scope.remote.forumVals[ltype].lst=this.scope.remote.forumVals[ltype]["topics"][cnttpc].lst;
                      this.scope.remote.forumVals[ltype].total=cnttpc;
                    }
                  });
              } else {
                this.scope.remote.forumVals[ltype] = [];
                this.scope.remote.forumVals[ltype]["topics"] = [];
              }
              console.log(this.scope);
            }
          );
          ln4A2Connect.ForumListTypeApi(formn, formn);
          this.frm.set(formn, true);
        }
      });
    }
    // use to check itm.lvl is present  
    return source.returnOK();
  }
  public checkitm(itm: any): boolean {
    if (itm != null) {
      if ("lvl" in itm) {
        return true;
      }
    }
    return false;
  }
  constructor(dialog: MatDialog) {
    super(true, true, dialog);
  }
}
