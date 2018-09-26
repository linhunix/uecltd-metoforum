import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ln4Manager, ln4Manager_evtConfig, ln4Manager_evtLanguage, ln4Manager_evtUpdate } from '../ln4/ln4.Manager';
import { MenuComponent } from './menu/menu.component';
import { TabComponent } from './tabs/tab.component';
import { ForumComponent } from './forum/forum.component';
import { NewsComponent } from './news.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { ln4Angular2 } from '../ln4/ln4.Angular2';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TabComponent,
    ForumComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTabsModule,
    MatExpansionModule

  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
    MenuComponent,
    TabComponent,
    ForumComponent,
    NewsComponent
  ]
})
export class AppModule {
  public constructor(private http: Http) {
    ln4Angular2.msgDebug("loadingHttpServ");
    this.getLn4Manager().serviceSet("http", http);

    ln4Angular2.msgDebug("loadingLang");
    ln4Angular2.eventGet(ln4Manager_evtLanguage, true).subscribe(
      (ltype: string) => {
        ln4Angular2.msgDebug("runload=" + ltype);
        this.getLn4Manager().runload(ltype);
        ln4Angular2.eventGet(ln4Manager_evtUpdate, true).emit(ltype);
      }
    );
    ln4Angular2.callUrl(ln4Manager_evtLanguage, "/assets/language.json", null)

    ln4Angular2.msgDebug("loadingConfig");
    ln4Angular2.eventGet(ln4Manager_evtConfig, true).subscribe(
      (ltype: string) => {
        ln4Angular2.msgDebug("runload=" + ltype);
        this.getLn4Manager().runload(ltype);
        ln4Angular2.eventGet(ln4Manager_evtUpdate, true).emit(ltype);
      }
    );
    ln4Angular2.callUrl(ln4Manager_evtConfig, "/assets/config.json", null)
  }
  public getLn4Manager(): ln4Manager {
    return ln4Manager.GetInstance();
  }
}
