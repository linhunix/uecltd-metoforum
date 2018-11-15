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
  public initcfg() {
    this.myId = "tabs";
  }
  constructor() {
    super();
  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    ln4Manager.GetInstance().dataImport("CurrentForum", this.scope.remote.list[tabChangeEvent.index]);
    ln4Angular2.eventEmit("CurrentForum", this.scope.remote.list[tabChangeEvent.index].forum, true);
  }

}
