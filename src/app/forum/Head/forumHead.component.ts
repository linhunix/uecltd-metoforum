import { Component, Output, Input } from '@angular/core';
import { ln4Manager } from '../../ln4/ln4.Manager';
import { ln4Map } from '../../ln4/ln4.Map';
import { ln4Angular2 } from '../../ln4/ln4.Angular2';
import { MatDialog } from '@angular/material';
import { ln4BaseComponent } from 'src/ln4/ln4.BaseComp';
import { ln4A2MatComponent } from 'src/ln4/mat/ln4.A2Mat.component';

@Component({
    selector: 'forum-head-ln4',
    templateUrl: './forumHead.component.html',
    styleUrls: ['./forumHead.component.css']
  })
  export class ForumHeadComponent extends ln4A2MatComponent {
  @Input("ListForums") public frmlist:string[];
  @Input("pageForums") public frmpage:number;
  @Input("IdForum") public IdForum:string;

  constructor(dialog: MatDialog) {
    super(true, true, dialog);
  }
}