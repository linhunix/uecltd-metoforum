import { Component } from '@angular/core';
import { ln4A2SimpleComp } from '../../ln4/ln4.A2SimpleComp';
import { ln4Angular2 } from '../../ln4/ln4.Angular2';

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

}
