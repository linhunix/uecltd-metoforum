import { Component, Input } from '@angular/core';
import { ln4Manager, ln4Manager_evtProfile } from '../../../ln4/ln4.Manager';
import { ln4Map } from '../../../ln4/ln4.Map';
import { ln4Angular2 } from '../../../ln4/ln4.Angular2';
import { ln4A2MatComponent } from 'src/ln4/mat/ln4.A2Mat.component';
import { MatDialog } from '@angular/material';
import { ln4A2Connect } from 'src/ln4/ln4.A2Connect';
@Component({
    selector: 'forumRow-ln4',
    templateUrl: './forumRow.component.html',
    styleUrls: ['./forumRow.component.css']

})
export class ForumRowComponent extends ln4A2MatComponent {
    @Input("RowItem")public itm: any;
    constructor(dialog: MatDialog) {
        super(true, true, dialog);
    }
    public checkitm(itm: any): boolean {
        if (itm != null) {
          if ("lvl" in itm) {
            return true;
          }
        }
        return false;
      }
}