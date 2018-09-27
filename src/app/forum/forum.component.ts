import { Component } from '@angular/core';
import { ln4A2SimpleComp } from '../../ln4/ln4.A2SimpleComp';
import { ln4Manager_evtConfig } from '../../ln4/ln4.Manager';

@Component({
  selector: 'forum-ln4',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent extends ln4A2SimpleComp {
  constructor(){
    super();
    this.myPrms=new Map();
    let cfgmap:Map<string,string>=new Map();
    console.log("forum:"+this.myId);
    cfgmap.set("forum",this.myId);// il lvalore lo dovrebbe prendere da remoto 
    cfgmap.set("privacyurl","privacyurl");
    this.myPrms.set(ln4Manager_evtConfig,cfgmap);
  }}
