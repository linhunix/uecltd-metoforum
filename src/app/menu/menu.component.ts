import { Component } from '@angular/core';
import { ln4Angular2 } from '../../ln4/ln4.Angular2';
import { ln4Manager, ln4Manager_evtConfig, ln4Manager_evtUpdate } from '../../ln4/ln4.Manager';
import { ln4A2SimpleComp } from '../../ln4/ln4.A2SimpleComp';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { MatMenu } from '@angular/material/menu';
import { ln4Map } from '../../ln4/ln4.Map';

@Component({
  selector: 'menu-ln4',
  templateUrl: './menu.component.mat.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends ln4A2SimpleComp {
  public initcfg() {
    this.myId = 'menu';
    const cfgmap: ln4Map = new ln4Map();
    cfgmap.set('title', 'title');
    this.scopeIn.set(ln4Manager_evtConfig, cfgmap);
  }
  public preReload(source: ln4Map, type: string): ln4Map {
    // use to make config
    return source.returnOK();
  }
  constructor() {
    super();
  }
}
