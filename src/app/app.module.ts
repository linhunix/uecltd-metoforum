import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { ln4Manager } from '../ln4/ln4.module';
import { MenuComponent } from './menu/menu.component';
import { TabComponent } from './tabs/tab.component';
import { ForumComponent } from './forum.component';
import { NewsComponent } from './news.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
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
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule
    ],
  providers: [],
  bootstrap: [
    AppComponent,
    MenuComponent,
    TabComponent,
    ForumComponent,
    NewsComponent
  ]
})
export class AppModule { 
  public constructor (private http: HttpClientModule){
    this.getLn4Manager().setService("http",http);
  }
  public getLn4Manager():ln4Manager{
    return ln4Manager.GetInstance();
  }
}
