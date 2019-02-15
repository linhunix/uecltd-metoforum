import { Component } from '@angular/core';
import { ln4A2SimpleComp } from '../../ln4/ln4.A2SimpleComp';
import { ln4Angular2 } from '../../ln4/ln4.Angular2';
import { MatTabChangeEvent } from '@angular/material';
import { ln4Manager } from 'src/ln4/ln4.Manager';

@Component({
  selector: 'tabs-ln4',
  templateUrl: './tab.component.new.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent extends ln4A2SimpleComp {
  private tabindex:number = 0;
  public initcfg() {
    this.myId = "tabs";
  }
  constructor() {
    super();
  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tabindex = tabChangeEvent.index;
    ln4Manager.GetInstance().dataImport("CurrentForum", this.scope.remote.list[this.tabindex]);
    ln4Angular2.eventEmit("CurrentForum", this.scope.remote.list[this.tabindex].forum, true);
  }
  public tabextra(classitem:string):string{
    if (classitem ==  this.scope.remote.list[this.tabindex].class){
      return " mat-tab-active-span ";
    }
    return "";
  }

}
