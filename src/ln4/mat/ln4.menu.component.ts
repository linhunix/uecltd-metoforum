import { Component } from '@angular/core'
import { ln4A2MatComponent } from './ln4.A2Mat.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'ln4-mat-menu-model',
    template: `
    <mat-menu #ln4MatMenuModel="matMenu">
        <a  mat-menu-item 
            *ngFor="let bitem of scope.remote.menu" 
            mat-button 
            href="{{bitem.src}}"
            (click)="calldialog(bitem.act,bitem)"
            >
            {{bitem.label}}                
        </a>
    </mat-menu>
    <button mat-button title="{{myId}}" [matMenuTriggerFor]="ln4MatMenuModel">
        {{scope.remote.label}}
    </button>
    `
})
export class ln4MatMenuModelComponent extends ln4A2MatComponent {
    constructor(dialog: MatDialog) { 
        super(true,true,dialog);
    }
    calldialog(dlgname:string,dlgvar:any):boolean{
        if (this.isDialog()){
            this.closeDialog();
        }
        this.setDialogClassName(dlgname);
        this.myaction=dlgvar;
        return this.openDialogEasy();
    }
}