import { Component } from '@angular/core';

@Component({
  selector: 'menu-ln4',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
 public scope = { 
    "menu": [
      {
        "label": "menu title 1",
        "src": "#",
        "value":[
          {
            "label": "sub menu title 1",
            "src": "#",
          }
        ]
      },
      {
        "label": "menu title 1",
        "src": "#"
      }
    ]
  };
}
