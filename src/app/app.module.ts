import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeadComponent } from './head/head.component';
import { ln4Manager, ln4Manager_evtConfig, ln4Manager_evtLanguage, ln4Manager_evtUpdate } from '../ln4/ln4.Manager';
import { MenuComponent } from './menu/menu.component';
import { TabComponent } from './tabs/tab.component';
import { ForumComponent } from './forum/forum.component';
import { NewsComponent } from './news/news.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { ln4Angular2 } from '../ln4/ln4.Angular2';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { FootComponent } from './foot/foot.component';
import { AppComponent } from './app.componet';
import { ln4MatMenuModelComponent } from '../ln4/mat/ln4.menu.component';
import { ln4ValuesPipe } from 'src/ln4/ln4.ValuesPipe';
import {MatDialogModule} from '@angular/material/dialog';
import { ln4MatLoginComponent } from 'src/ln4/mat/ln4.login.component';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CKEditorModule} from 'ng2-ckeditor';
import { EditorComponent } from './Edit/edit.component';
import { ForumHeadComponent } from './forum/Head/forumHead.component';
import { ForumRowComponent } from './forum/Row/forumRow.component';
import { ForumEditorComponent } from './forum/Edit/forumEdit.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { ForumRowLineComponent } from './forum/RowLine/forumRowLine.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FootComponent,
    MenuComponent,
    TabComponent,
    ForumComponent,
    NewsComponent,
    ln4MatMenuModelComponent,
    ln4ValuesPipe,
    ln4MatLoginComponent,
    ForumEditorComponent,
    EditorComponent,
    ForumHeadComponent,
    ForumRowLineComponent,
    ForumRowComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularEditorModule,
    MatSelectModule,
    CKEditorModule
  ],
  providers: [
  ],
  entryComponents: [
    ln4MatLoginComponent,
    ForumEditorComponent,
    EditorComponent,
    EditProfileComponent
  ],
  bootstrap: [
    AppComponent,
    HeadComponent,
    FootComponent,
    MenuComponent,
    TabComponent,
    NewsComponent
  ]
})
export class AppModule {
  public constructor(private http: Http) {
    // INIT HTTP
    ln4Angular2.msgDebug('loadingHttpServ');
    this.getLn4Manager().serviceSet('http', http);
    // LANGUAGE
    ln4Angular2.msgDebug('loadingLang');
    ln4Angular2.eventGet(ln4Manager_evtLanguage, true).subscribe(
      (ltype: string) => {
        ln4Angular2.msgDebug('runload=' + ltype);
        this.getLn4Manager().runload(ltype);
      }
    );
    ln4Angular2.callUrl(ln4Manager_evtLanguage, '/assets/language.json', null)
    /// CONFIG
    ln4Angular2.msgDebug('loadingConfig');
    ln4Angular2.eventGet(ln4Manager_evtConfig, true).subscribe(
      (ltype: string) => {
        ln4Angular2.msgDebug('runload=' + ltype);
        this.getLn4Manager().runload(ltype);
        ln4Angular2.eventGet(ln4Manager_evtUpdate, true).emit(ltype);
        ln4Angular2.resetdbg();
      }
    );
    ln4Angular2.callUrl(ln4Manager_evtConfig, '/assets/config.json', null);
    // init component
    ln4Angular2.setCompLib('ln4MatLoginComponent', ln4MatLoginComponent);
    ln4Angular2.setCompLib('ForumEditorComponent', ForumEditorComponent);
    ln4Angular2.setCompLib('EditorComponent', EditorComponent);
    ln4Angular2.setCompLib('EditProfileComponent', EditProfileComponent);

  }
  public getLn4Manager(): ln4Manager {
    return ln4Manager.GetInstance();
  }
}
