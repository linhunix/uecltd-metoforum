import { Component } from '@angular/core';
import { ln4A2SimpleComp } from '../ln4/ln4.A2SimpleComp';
import { ln4Manager_evtConfig } from '../ln4/ln4.Manager';

@Component({
  selector: 'app-ln4',
  templateUrl: './app.component.html',
})
export class AppComponent extends ln4A2SimpleComp {
  public initcfg(){
    this.myId="App"
    let cfgmap:Map<string,string>=new Map();
    cfgmap.set("title","title");
    cfgmap.set("desc","desc");
    this.myPrms.set(ln4Manager_evtConfig,cfgmap);
  }
  constructor() {
    super(true);
  }
}
