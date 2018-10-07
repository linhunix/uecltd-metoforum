import { Component } from '@angular/core'
import { ln4A2SimpleComp } from '../ln4.A2SimpleComp';

@Component({
    selector: 'ln4-mat-menu-model',
    template: `
    <mat-menu #ln4MatMenuModel="matMenu">
        <a  mat-menu-item 
            *ngFor="let bitem of scope.remote.menu" 
            mat-button 
            href="{{bitem.src}}"
            >
            {{bitem.label}}                
        </a>
    </mat-menu>
    <button mat-button title="{{myId}}" [matMenuTriggerFor]="ln4MatMenuModel">
        {{scope.remote.label}}
    </button>
    `
})
export class ln4MatMenuModelComponent extends ln4A2SimpleComp {
    constructor(){
        super();
    }
}