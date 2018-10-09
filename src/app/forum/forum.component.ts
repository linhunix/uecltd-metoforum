import { Component } from '@angular/core';
import { ln4A2SimpleComp } from '../../ln4/ln4.A2SimpleComp';
import { ln4Manager_evtConfig, ln4Manager_evtUpdate, ln4Manager } from '../../ln4/ln4.Manager';
import { ln4Map } from '../../ln4/ln4.Map';
import { ln4Angular2 } from '../../ln4/ln4.Angular2';

@Component({
  selector: 'forum-ln4',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent extends ln4A2SimpleComp {
  private frm: ln4Map;
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
      let obj:ln4Map= new ln4Map();
      obj.fromAny(source.get("forumVals"));
      obj.set(type, ln4Manager.GetInstance().dataExport(type));
      source.set("forumVals",obj.toJson());
    }
    console.log("Check Forum:" + this.myId + "/" + type);
    console.log(source);
    console.log(ln4Manager.GetInstance());
    if (source.has("forums")) {
      source.get("forums").forEach((element: string) => {
        let formn = "form-" + element;
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
              ln4Angular2.msgDebug("eventGet=" +this.myId+"/"+ ltype);
              this.reload(ltype);
            });
          ln4Angular2.callUrl(formn,formu, null, false);
          this.frm.set(formn, true);
        }
      });
    }
    // use to make config 
    return source.returnOK();
  }
  constructor() {
    super();
  }
}
