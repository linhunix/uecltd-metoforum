import { Component } from '@angular/core';

@Component({
  selector: 'tabs-ln4',
  templateUrl: './tab.component.new.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  public scope:any;
  constructor(){
    this.scope={
      "tabs":[
        {
          "label":"Now Casting",
          "filtro":"filtro Now casting"
        },
        {
          "label":"Discussioni",
          "filtro":"filtro_discussioni"
        },
        {
          "label":"Strumentazione",
          "filtro":"filtro_Strumentazione"
        },
        {
          "label":"Mix",
          "filtro":"filtro_Mix"
        }
      ]
    };
  }
}
