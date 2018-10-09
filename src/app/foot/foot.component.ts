import { Component } from '@angular/core';
import { ln4Manager, ln4Manager_evtConfig } from '../../ln4/ln4.Manager';
import { ln4A2SimpleComp } from '../../ln4/ln4.A2SimpleComp';
import { ln4Map } from 'src/ln4/ln4.Map';
//import { Title } from '@angular/platform-browser';

@Component({
  selector: 'foot-ln4',
  templateUrl: './foot.component.html',
  styleUrls: ['./foot.component.css']
})
export class FootComponent extends ln4A2SimpleComp{
  public initcfg(){
    this.myId="Foot"
    let cfgmap:ln4Map=new ln4Map();
    cfgmap.set("copyright","copyright");
    cfgmap.set("privacyurl","privacyurl");
    this.myPrms.set(ln4Manager_evtConfig,cfgmap);
  }
  constructor(){
    super();
  }

}
