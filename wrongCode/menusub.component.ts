import { Component, Input } from '@angular/core';

@Component({
  selector: 'menusub-ln4',
  templateUrl: './menusub.component.new.html',
  styleUrls: ['./menusub.component.css']
})
export class MenusubComponent {
  @Input("source") scope;
  private lastcnt:number;
  private static count:number;
  public static getCount():number{
    if (MenusubComponent.count==null){
      MenusubComponent.count=0;
    }
    MenusubComponent.count++;
    return MenusubComponent.count;
  }
  public getlast(){
    if (this.lastcnt==null){
      this.lastcnt=MenusubComponent.getCount();
    }
    return this.lastcnt
  }
}
