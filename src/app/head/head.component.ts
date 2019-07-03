import { Component } from '@angular/core';
import { ln4Manager, ln4Manager_evtConfig } from '../../ln4/ln4.Manager';
import { ln4A2SimpleComp } from '../../ln4/ln4.A2SimpleComp';
import { ln4Map } from 'src/ln4/ln4.Map';
import { ln4Angular2 } from 'src/ln4/ln4.Angular2';
// import { Title } from '@angular/platform-browser';

@Component({
  selector: 'head-ln4',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent extends ln4A2SimpleComp {
  public sezione: string;
  public image: string;
  public initcfg() {
    this.myId = 'Head';

    const cfgmap: ln4Map = new ln4Map();
    cfgmap.set('title', 'title');

    this.scopeIn.set(ln4Manager_evtConfig, cfgmap);
  }
  constructor() {
    super();

    this.sezione = null;
    this.image = null;

    ln4Angular2.eventGet('CurrentForum', true).subscribe(
      (forum: string) => {
        // this.sezione = forum;

        this.scope.forum = ln4Manager.GetInstance().dataExport('CurrentForum');

        if ('image' in this.scope.forum) {
          this.image = this.scope.forum.image;
        }
      }
    );
  }
}
