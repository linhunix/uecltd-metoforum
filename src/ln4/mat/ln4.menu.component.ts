import { Component } from '@angular/core';
import { ln4A2MatComponent } from './ln4.A2Mat.component';
import { MatDialog } from '@angular/material';
import { ln4Manager } from '../ln4.Manager';
import { ln4CookieManager } from '../ln4.CookieManager';

@Component({
    selector: 'ln4-mat-menu-model',
    templateUrl: 'ln4.menu.component.html'
})
export class ln4MatMenuModelComponent extends ln4A2MatComponent {
    constructor(dialog: MatDialog) {
        super(true, true, dialog);

        console.log('this.scope.remote.menu: ', this.scope.remote);
    }

    public isLogged(): boolean {
      return !(ln4Manager.GetInstance().profileGet('UserName') == null);
    }

    public isNotLogged(): boolean {
      return ln4Manager.GetInstance().profileGet('UserName') == null;
    }

    public Logout() {
      console.log('>>>>>>>>> LOGGING OUT <<<<<<<<<');

      ln4CookieManager.GetInstance().Logout();
    }

    public EditProfile() {

      console.log('Edit Profile Not Implemented');

    }

    public Translate(mylabel: string): string {
        switch (mylabel) {
            case '#P#UserName#':
                let refu: string = ln4Manager.GetInstance().profileGet('UserName');
                if (refu == null) {
                    refu = 'Login';
                }
                return refu;
            case '#P#GroupName#':
                const refg: string = ln4Manager.GetInstance().profileGet('GroupName');
                /*if (refg == null) {
                    refg = 'Guest!';
                }*/
                return refg;
            default:
                return ln4Manager.GetInstance().translate(mylabel);
        }
    }
}
