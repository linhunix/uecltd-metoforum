import { Component } from '@angular/core';
import { ln4Manager, ln4Manager_evtProfile } from '../../ln4/ln4.Manager';
import { ln4Map } from '../../ln4/ln4.Map';
import { ln4Angular2 } from '../../ln4/ln4.Angular2';
import { ln4A2MatComponent } from 'src/ln4/mat/ln4.A2Mat.component';
import { MatDialog } from '@angular/material';
import { ln4A2Connect } from 'src/ln4/ln4.A2Connect';
// tslint:disable:quotemark
@Component({
  selector: 'forum-ln4',
  //  templateUrl: './forum.component.div.html',
  //  styleUrls: ['./forum.component.div.css']
  templateUrl: './forum.component.line.html',
  styleUrls: ['./forum.component.line.css']
})
// tslint:disable:quotemark
export class ForumComponent extends ln4A2MatComponent {
  private frm: ln4Map;
  public frmlst: string[] = [];
  public lbl: any = {};
  public frmpg = 0;
  public initcfg() {
    this.frm = new ln4Map();
  }

  /**
   * override preload to get info about standard reload
   */
  public preReload(source: ln4Map, type: string): ln4Map {
    if ((this.myId != null) && (this.frm.has(this.myId) === false)) {
      ln4Angular2.msgDebug("subscibe=" + this.myId);
      ln4Angular2.eventGet(this.myId, true).subscribe(
        (ltype: string) => {
          this.reload(ltype);
        });
      this.frm.set(this.myId, true);
    }
    if (type === "reload" || type === ln4Manager_evtProfile) {
      ln4Angular2.msgInfo("force Reload");
      this.frm = new ln4Map();
      this.frm.set(this.myId, true);
      source.delete("forumVals");
    }
    return source.returnOK();
  }
  public postReload(source: ln4Map, type: string): ln4Map {
    if (this.frm.has(type)) {
      const obj: ln4Map = new ln4Map();
      obj.fromAny(source.get("forumVals"));
      const vals = ln4Manager.GetInstance().dataExport(type);
      if (vals != null) {
        obj.setFromAny(type, vals);
      }
      source.set("forumVals", obj.toJson());
      this.frmlst = ln4Map.Load(source.get("forumVals")).keys();

      console.log('this.frmlst: ', this.frmlst);
    }
    if (source.has("forums")) {
      const priids = [];
      const secids = [];
      source.get("forums").forEach((element: string) => {
        const formn = this.myId + "-" + element;
        if (this.frm.has(formn) === false) {
          if (ln4Angular2.isDebug()) {
            console.log(formn);
          }
          ln4Angular2.msgDebug("subscibe=" + formn);
          ln4Angular2.eventKill(formn);
          ln4Angular2.eventGet(formn, true).subscribe(
            (ltype: string) => {
              ln4Angular2.msgDebug("eventGet=" + this.myId + "/" + ltype);

              this.reload(ltype);
              // this.doaction('reload');

              // console.log('this.scope.remote.forumVals: ', this.scope.remote.forumVals);

              if (this.scope.remote.forumVals[ltype] != null) {
                let cnttpc = 0;
                let cntsub = 0;
                const lsttpc = {};
                const lstcnt = {};
                const fval = this.scope.remote.forumVals[ltype];
                this.scope.remote.forumVals[ltype] = {};
                this.scope.remote.forumVals[ltype]["topics"] = {};
                this.scope.remote.forumVals[ltype].lbl = this.Translate(ltype);
                this.scope.remote.forumVals[ltype].lvl = 0;
                this.scope.remote.forumVals[ltype].cnt = 0;
                Object.keys(fval).forEach(
                  (key: any) => {
                    const kval = fval[key];
                    if (kval.docid != null) {
                      let docid: number = 0 + kval.docid;
                      if (kval.docid === kval.catid) {
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
                        // console.log("top is " + docid + ' with level 0');
                      } else {
                        const topic = kval.value;
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
                        // tslint:disable-next-line:max-line-length
                        // console.log(ltype + "/" + cntsub + " is " + docid + '[' + topic.docid + '/' + kval.catid + '] with level ' + topic.lvl);
                        // console.log(kval);
                if (topic.lvl === 1) {
                  cnttpc++;
                  lsttpc[topic.lbl] = cnttpc;
                  lstcnt[topic.lbl] = 0;
                  priids[topic.lbl] = docid;
                  this.scope.remote.forumVals[ltype]["topics"][docid] = topic;
                  this.scope.remote.forumVals[ltype]["topics"][docid].lid = docid;
                 // console.log(ltype + "/" + topic.lbl + " is " + docid + " is mode pri");
                } else {
                  lstcnt[topic.lbl]++;
                  const secid: number = 0 + lstcnt[topic.lbl];
                  secids[secid] = docid;
                  const priid: number = 0 + lsttpc[topic.lbl];
                  const subid: number = 0 + secids[secid];
                  docid = 0 + priids[topic.lbl];
                  if (!(docid in this.scope.remote.forumVals[ltype]["topics"])) {
                    this.scope.remote.forumVals[ltype]["topics"][docid] = {
                      "topics": {
                        "lid": docid
                      }
                    };
                  }
                  this.scope.remote.forumVals[ltype]["topics"][docid]["topics"][subid] = topic;
                  this.scope.remote.forumVals[ltype]["topics"][docid].cnt = priid;
                  if (this.scope.remote.forumVals[ltype]["topics"][docid].lid < subid) {
                    this.scope.remote.forumVals[ltype]["topics"][docid].lid = subid;
                  }
                  // console.log(ltype + "/" + kval.lbl + " is " + docid + " is mode sub");
                }
                this.scope.remote.forumVals[ltype].lun = this.scope.remote.forumVals[ltype]["topics"][docid].lun;
                this.scope.remote.forumVals[ltype].lgr = this.scope.remote.forumVals[ltype]["topics"][docid].lgr;
                this.scope.remote.forumVals[ltype].lps = this.scope.remote.forumVals[ltype]["topics"][docid].lps;
                this.scope.remote.forumVals[ltype].lst = this.scope.remote.forumVals[ltype]["topics"][docid].lst;
                this.scope.remote.forumVals[ltype].lid = docid;
                this.scope.remote.forumVals[ltype].cnt = cntsub;
                this.scope.remote.forumVals[ltype].cnttpc = cnttpc;
              }
            }
          });
    } else {
      this.scope.remote.forumVals[ltype] = {};
      this.scope.remote.forumVals[ltype]["topics"] = {};
    }

    // console.log("this.scope.remote.forumVals[ltype]: ", this.scope.remote.forumVals[ltype]);

    /*let svar = null;
    if (this.scope.remote.forumVals[ltype]["topics"]) {
      svar = this.scope.remote.forumVals[ltype]["topics"].sort(
          (t1, t2) => {
              return t1.lid + t2.lid;
          }
      );
    }*/
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
    if ('lvl' in itm) {
      return true;
    }
  }
  return false;
}
  public getItm(fid: string): any {
  if (this.scope.remote.forumVals != null) {
    // console.log('this.scope.remote.forumVals: ', this.scope.remote.forumVals);

    // This is the root of the discussion thread for each forum
    if (fid in this.scope.remote.forumVals) {
      // console.log('this.scope.remote.forumVals[' + fid + ']: ', this.scope.remote.forumVals[fid]);

      // console.log('this.scope.remote.forumVals[' + fid + ']->length: ', this.scope.remote.forumVals[fid].length);

      return this.scope.remote.forumVals[fid];
    }
  }

  return {};
}
  public getLst(fid: string): any {
  return [fid];
}
constructor(dialog: MatDialog) {
  super(true, true, dialog);
  this.lbl = {
    desc: "Titolo",
    rows: "Risposte",
    date: "Ultimo Agg.",
    auth: "Autore e Localita'"
  };
}
}
