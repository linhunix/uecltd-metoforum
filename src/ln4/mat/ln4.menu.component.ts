import { Component } from '@angular/core';
import { ln4A2MatComponent } from './ln4.A2Mat.component';
import { MatDialog } from '@angular/material';
import { ln4Manager } from '../ln4.Manager';

@Component({
    selector: 'ln4-mat-menu-model',
    template: `
    <mat-menu #ln4MatMenuModel="matMenu">
        <a  mat-menu-item
            *ngFor="let bitem of scope.remote.menu"
            mat-button
            href="{{bitem.src}}"
            (click)="calldialog(bitem.act,bitem.arg)"
            >
            {{Translate(bitem.label)}}
        </a>
    </mat-menu>
    <button mat-button title="{{myId}}" [matMenuTriggerFor]="ln4MatMenuModel">
        {{Translate(scope.remote.label)}}
    </button>
    `
})
export class ln4MatMenuModelComponent extends ln4A2MatComponent {
    constructor(dialog: MatDialog) {
        super(true, true, dialog);
    }
    public Translate(mylabel: string): string {
        switch (mylabel) {
            case '#P#UserName#':
                let refu: string = ln4Manager.GetInstance().profileGet('UserName');
                if (refu == null) {
                    refu = 'Guest!!';
                }
                return refu;
            case '#P#GroupName#':
                let refg: string = ln4Manager.GetInstance().profileGet('GroupName');
                if (refg == null) {
                    refg = 'Guest!';
                }
                return refg;
            default:
                return ln4Manager.GetInstance().translate(mylabel);
        }
    }
}
