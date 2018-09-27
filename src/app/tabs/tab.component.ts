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
          "forum":"Casting",
          "filtro":"filtro Now casting"
        },
        {
          "label":"Discussioni",
          "forum":"talk",
          "filtro":"filtro_discussioni"
        },
        {
          "label":"Varie & Strumentazione",
          "forum":"ot",
          "filtro":"filtro_Strumentazione"
        },
        {
          "label":"Funghi",
          "forum":"funghi",
          "filtro":"filtro_Mix"
        }
      ]
    };
  }
}
