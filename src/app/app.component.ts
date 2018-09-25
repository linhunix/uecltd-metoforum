import { Component } from '@angular/core';
import { ln4Manager, ln4Manager_evtConfig } from '../ln4/ln4.Manager';
import { ln4A2SimpleComp } from '../ln4/ln4.A2SimpleComp';

@Component({
  selector: 'app-ln4',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ln4A2SimpleComp{
  constructor(){
    super();
    this.myId="App"
    this.myPrms=new Map();
    let cfgmap:Map<string,string>=new Map();
    cfgmap.set("title","title");
    this.myPrms.set(ln4Manager_evtConfig,cfgmap);
  }
  public reload(type:string){
    super.reload(type);
    console.log(type);
    console.log(this.scope);
  }
}
