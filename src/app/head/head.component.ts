import { Component } from '@angular/core';
import { ln4Manager, ln4Manager_evtConfig } from '../../ln4/ln4.Manager';
import { ln4A2SimpleComp } from '../../ln4/ln4.A2SimpleComp';
//import { Title } from '@angular/platform-browser';

@Component({
  selector: 'head-ln4',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent extends ln4A2SimpleComp{
  public initcfg(){
    this.myId="Head"
    let cfgmap:Map<string,string>=new Map();
    cfgmap.set("title","title");
    this.myPrms.set(ln4Manager_evtConfig,cfgmap);
  }
  constructor(){
    super();
  }
}
