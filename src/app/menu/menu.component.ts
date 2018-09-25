import { Component } from '@angular/core';
import { ln4Angular2 } from '../../ln4/ln4.Angular2';
import { ln4Manager, ln4Manager_evtConfig, ln4Manager_evtUpdate } from '../../ln4/ln4.Manager';
import { ln4A2SimpleComp } from '../../ln4/ln4.A2SimpleComp';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'menu-ln4',
  templateUrl: './menu.component.mat.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends ln4A2SimpleComp {
  public menu: any[] = [];
  constructor() {
    super();
    this.myId = "menu";
    this.myPrms = new Map();
    let cfgmap: Map<string, string> = new Map();
    cfgmap.set("menu", "menu");
    cfgmap.set("title", "title");
    cfgmap.set("MainMenu", "menu");
    this.myPrms.set(ln4Manager_evtConfig, cfgmap);
  }
  public getMenu():void {
    this.scope.menun=this.getKeyArray(this.scope.menu);
    this.scope.menum=this.getKeyArray(this.scope.MainMenu);
    }
  public reload(type: string) {
    super.reload(type);
    this.getMenu();
  }
}
