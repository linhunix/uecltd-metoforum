import { Component } from '@angular/core';
import { ln4Manager, ln4Manager_evtProfile } from '../../ln4/ln4.Manager';
import { ln4Map } from '../../ln4/ln4.Map';
import { ln4Angular2 } from '../../ln4/ln4.Angular2';
import { ln4A2MatComponent } from 'src/ln4/mat/ln4.A2Mat.component';
import { MatDialog } from '@angular/material';
import { ln4A2Connect } from 'src/ln4/ln4.A2Connect';
@Component({
  selector: 'forum-ln4',
//  templateUrl: './forum.component.div.html',
//  styleUrls: ['./forum.component.div.css']
  templateUrl: './forum.component.line.html',
  styleUrls: ['./forum.component.line.css']
})
export class ForumComponent extends ln4A2MatComponent {
  private frm: ln4Map;
  public frmlst: string[] = [];
  public lbl:any={};
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
    if (source.has("forums")) {
      let priids=[];
      let secids=[];
      source.get("forums").forEach((element: string) => {
        let formn = this.myId + "-" + element;
        if (this.frm.has(formn) == false) {
          if (ln4Angular2.isDebug()) {
            console.log(formn);
          }
          ln4Angular2.msgDebug("subscibe=" + formn);
          ln4Angular2.eventKill(formn);
          ln4Angular2.eventGet(formn, true).subscribe(
            (ltype: string) => {
              ln4Angular2.msgDebug("eventGet=" + this.myId + "/" + ltype);
              this.reload(ltype);
              if (this.scope.remote.forumVals[ltype] != null) {
                let cnttpc = 0
                let cntsub = 0
                let lsttpc = {};
                let lstcnt = {};
                let fval = this.scope.remote.forumVals[ltype];
                this.scope.remote.forumVals[ltype] = {};
                this.scope.remote.forumVals[ltype]["topics"] = {};
                this.scope.remote.forumVals[ltype].lbl = this.Translate(ltype);
                this.scope.remote.forumVals[ltype].lvl = 0;
                this.scope.remote.forumVals[ltype].cnt = 0;
                Object.keys(fval).forEach(
                  (key: any) => {
                    let kval = fval[key];
                    if (kval.docid != null) {
                      let docid: number =0 + kval.docid;
                      console.log("time of "+docid);
                      if (kval.docid == kval.catid) {
                        if (kval.value != null) {
                          Object.keys(kval.value).forEach(
                            (subk: string) => {
                              this.scope.remote.forumVals[ltype][subk] = kval.value[subk];
                            }
                          );
                        }
                        this.scope.remote.forumVals[ltype].idx = key;
                        this.scope.remote.forumVals[ltype].doc = kval;
                        this.scope.remote.forumVals[ltype].lvl = 0;
                        this.scope.remote.forumVals[ltype].cnt = 0;
                        this.scope.remote.forumVals[ltype].docid = kval.docid;
                        this.scope.remote.forumVals[ltype].catid = kval.catid;
                        this.scope.remote.forumVals[ltype].name = kval.name;
                        if (this.scope.remote.forumVals[ltype].cat == null) {
                          this.scope.remote.forumVals[ltype].cat = ltype;
                        }
                        if (this.scope.remote.forumVals[ltype].sbj == null) {
                          this.scope.remote.forumVals[ltype].sbj = "";
                        }
                        if (this.scope.remote.forumVals[ltype].dsc == null) {
                          this.scope.remote.forumVals[ltype].dsc = "";
                        }
                      } else {
                        let topic = kval.value;
                        topic.idx = key;
                        topic.doc = kval;
                        topic.docid = kval.docid;
                        topic.catid = kval.catid;
                        topic.name = kval.name;
                        if (topic.lvl == null) {
                          topic.lvl = 1;
                        }
                        if (topic.cat == null) {
                          topic.cat = ltype;
                        }
                        topic.cnt = 0;
                        topic.topics = [];
                        cntsub++;
                        if (topic.lvl == 1) {
                          cnttpc++;
                          lsttpc[kval.lbl] = cnttpc;
                          lstcnt[kval.lbl] = 0;
                          priids[kval.lbl] = docid;
                          this.scope.remote.forumVals[ltype]["topics"][docid] = topic;
                        } else {
                          lstcnt[kval.lbl]++;                  
                          let secid: number = 0 + lstcnt[kval.lbl];
                          secids[secid]= docid;
                          let priid: number = 0 + lsttpc[kval.lbl];
                          let subid: number = 0 + secids[kval.lbl];
                          docid = 0 + priids[kval.lbl];
                          if (!(docid in this.scope.remote.forumVals[ltype]["topics"])){
                            this.scope.remote.forumVals[ltype]["topics"][docid]={
                              "topics":[]
                            };
                          }
                          this.scope.remote.forumVals[ltype]["topics"][docid]["topics"][subid] = topic;
                          this.scope.remote.forumVals[ltype]["topics"][docid].cnt = priid;
                        }                    
                        this.scope.remote.forumVals[ltype].lun = this.scope.remote.forumVals[ltype]["topics"][docid].lun;
                        this.scope.remote.forumVals[ltype].lgr = this.scope.remote.forumVals[ltype]["topics"][docid].lgr;
                        this.scope.remote.forumVals[ltype].lps = this.scope.remote.forumVals[ltype]["topics"][docid].lps;
                        this.scope.remote.forumVals[ltype].lst = this.scope.remote.forumVals[ltype]["topics"][docid].lst;
                        this.scope.remote.forumVals[ltype].cnt = cntsub;
                        this.scope.remote.forumVals[ltype].cnttpc = cnttpc;

                      }
                    }

                });
              } else {
                this.scope.remote.forumVals[ltype] = [];
                this.scope.remote.forumVals[ltype]["topics"] = [];
              }
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
  public getItm(fid: string): any {
    if (this.scope.remote.forumVals != null) {
      if (fid in this.scope.remote.forumVals) {
        return this.scope.remote.forumVals[fid];
      }
    }
    return {};
  }
  public getLst(fid:string):any{
    return [fid];
  }
  constructor(dialog: MatDialog) {
    super(true, true, dialog);
    this.lbl={
      desc:"Titolo",
      rows:"Risposte",
      date:"Ultimo Agg.",
      auth:"Autore e Localita'"
    };
  }
}
