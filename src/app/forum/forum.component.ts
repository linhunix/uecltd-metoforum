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
    console.log("IM HERE");
    if ((this.myId!=null)&&(this.frm.has(this.myId)==false)){
      ln4Angular2.eventGet(this.myId, true).subscribe(
        (ltype: string) => {
          this.reload(type);          
        });  
        this.frm.set(this.myId,true);    
    }
    if (type=="reload"){
      ln4Angular2.msgInfo("force Reload");
      this.frm= new ln4Map();
      this.frm.set(this.myId,true);    
    }
    return source.returnOK();
  }
  public postReload(source: ln4Map, type: string): ln4Map {
    if (this.frm.has(type)){
      source.set(type,ln4Manager.GetInstance().dataExport(type));
    }
    console.log("Check Forum:"+this.myId+"/"+type);
    console.log(source);
    console.log(ln4Manager.GetInstance());
    if (source.has("forums")) {
      source.get("forums").forEach((element:string) => {
        let formn="form:"+element;
        if (this.frm.has(formn) == false) {
          if (ln4Angular2.isDebug()) {
            console.log(formn);
          }
          ln4Angular2.callUrl(formn, "/assets/forum." + element + ".json", null, true);
          ln4Angular2.eventGet(ln4Manager_evtUpdate, true).subscribe(
            (ltype: string) => {
              this.reload(type);
            });
          this.frm.set(formn,true);
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
