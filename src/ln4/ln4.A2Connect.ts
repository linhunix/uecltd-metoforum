import {
  ln4Manager,
  ln4Manager_evtProfile,
  ln4Manager_evtProfileX,
  ln4Manager_evtUpdate
} from './ln4.Manager';
import { ln4Angular2 } from './ln4.Angular2';
import { ln4Map } from './ln4.Map';
import { ln4CookieManager } from './ln4.CookieManager';

/**
 *
 */
export class ln4A2Connect {
  /**
   * Generate a new docid
   * @returns number new docid
   */
  public static newDocid(): number {
    // let docid: number =
    // docid = docid - 943920000;
    return Math.trunc(new Date().getTime() / 1000);
  }

  /**
   * base api connector
   * @param Action
   * @param apiEvent
   * @param Post
   */
  private static ApiConnect(
    Action: string,
    apiEvent: string,
    Post: ln4Map
  ): boolean {
    let url = ln4Manager.GetInstance().cfgGet('serverurl');
    const ses = ln4Manager.GetInstance().profileGet('UserSess');

    if (Action === 'RestLogin') {
      url += '/-/' + Action;
    } else {
      url += '/' + ses + '/' + Action;
    }
    return ln4Angular2.callUrl(apiEvent, url, Post);
  }
  /**
   * login functionality
   *
   * Do Login
   * @param user
   * @param pass
   */
  public static LoginApi(user: string, pass: string): boolean {
    const Post: ln4Map = new ln4Map();

    Post.set('UserAlias', user);
    Post.set('UserCode', pass);

    ln4Angular2
      .eventGet(ln4Manager_evtProfileX, true)
      .subscribe((ltype: string) => {
        ln4Angular2.msgDebug('runload=' + ltype);

        const ln4m = ln4Manager.GetInstance();
        const res = ln4m.dataExport(ltype);

        if (res == null) {
          return alert(ln4Manager.GetInstance().translate('Server Time out!!'));
        }

        console.log('ln4m 1: ', ln4m);
        console.log('res 1: ', res);

        if (res instanceof ln4Map) {
          ln4Manager.GetInstance().runload(ltype);
        }
      });

    ln4Angular2
      .eventGet(ln4Manager_evtProfile, true)
      .subscribe((ltype: string) => {
        ln4Angular2.msgDebug('runload=' + ltype);

        const ln4m = ln4Manager.GetInstance();
        const res = ln4m.dataExport(ltype);

        if (res == null) {
          return alert(ln4Manager.GetInstance().translate('Server Time out!!'));
        }

        console.log('ln4m 2: ', ln4m);
        console.log('res 2: ', res);

        if (res instanceof ln4Map) {
          if (res.has('GroupName')) {
            if (res.get('GroupName') === 'Guest') {
              return alert(ln4Manager.GetInstance().translate('wrong user!!'));
            }
          } else {
            return alert(ln4Manager.GetInstance().translate('Server Reject!!'));
          }
        }

        const cookieManager = new ln4CookieManager();

        const userData = {
          UserId: res.get('UserId'),
          UserName: res.get('UserName'),
          GroupName: res.get('GroupName'),
          GroupId: res.get('GroupId'),
          UserSess: res.get('UserSess')
        };

        console.log('UserId: ', userData.UserId);
        console.log('UserName: ', userData.UserName);
        console.log('GroupName: ', userData.GroupName);
        console.log('GroupId: ', userData.GroupId);

        if (res.get('UserId') === 0) {
          console.log('>>>>>> NOT LOGGED !!!!');
        } else {
          console.log('>>>>>> LOGGED !!!!');

          const sessionStr = btoa(JSON.stringify(userData));

          cookieManager.setCookie('userData', sessionStr, 30);
        }

        ln4Manager.GetInstance().runload(ltype);

        const uid = res.get('UserId');
        const uname = res.get('UserName');

        this.UserLoadApi(4000, uid, uname, ln4Manager_evtProfileX);

        ln4Angular2.eventGet(ln4Manager_evtUpdate, true).emit(ltype);
      });
    return ln4A2Connect.ApiConnect('RestLogin', ln4Manager_evtProfile, Post);
  }
  public static UserLoadApi(
    grpid: number,
    usrid: number,
    usrname: string,
    userEvent: string
  ): boolean {
    const Post: ln4Map = new ln4Map();

    Post.set('DocCatId', grpid);
    Post.set('DocType', 'ln4public');
    Post.set('DocId', usrid);
    Post.set('DocName', usrname);

    return ln4A2Connect.ApiConnect('RestTLoad', userEvent, Post);
  }
  /**
   *
   * @param catid
   * @param forumEvnt
   */
  public static ForumCatListApi(catid: number, forumEvnt: string): boolean {
    const Post: ln4Map = new ln4Map();
    Post.set('DocCatId', catid);
    return ln4A2Connect.ApiConnect('RestCList', forumEvnt, Post);
  }
  public static ForumListApi(catid: number, forumEvnt: string): boolean {
    const Post: ln4Map = new ln4Map();
    Post.set('DocCatId', catid);
    Post.set('DocType', 'Forum');
    return ln4A2Connect.ApiConnect('RestTList', forumEvnt, Post);
  }
  public static ForumListTypeApi(
    forumEvnt: string,
    forumtype: string
  ): boolean {
    const Post: ln4Map = new ln4Map();
    Post.set('DocType', forumtype);
    return ln4A2Connect.ApiConnect('RestNList', forumEvnt, Post);
  }
  public static ForumFindApi(
    catid: number,
    findstr: string,
    forumEvnt: string
  ): boolean {
    const Post: ln4Map = new ln4Map();
    Post.set('DocCatId', catid);
    Post.set('DocType', 'Forum');
    Post.set('Find', findstr);
    return ln4A2Connect.ApiConnect('RestTFind', forumEvnt, Post);
  }
  public static ForumLoadApi(
    catid: number,
    docid: number,
    topic: string,
    forumEvnt: string
  ): boolean {
    const Post: ln4Map = new ln4Map();
    Post.set('DocCatId', catid);
    Post.set('DocType', 'Forum');
    Post.set('DocId', docid);
    Post.set('DocName', topic);
    return ln4A2Connect.ApiConnect('RestTLoad', forumEvnt, Post);
  }
  public static ForumSaveApi(
    catid: number,
    docid: number,
    topic: string,
    content: ln4Map,
    forumEvnt: string
  ): boolean {
    const Post: ln4Map = new ln4Map();
    Post.set('DocCatId', catid);
    Post.set('DocType', 'Forum');
    Post.set('DocId', docid);
    Post.set('DocName', topic);
    Post.set('DocValue', content.toJson());
    return ln4A2Connect.ApiConnect('RestTSave', forumEvnt, Post);
  }
  public static ForumCancApi(
    catid: number,
    docid: number,
    topic: string,
    forumEvnt: string
  ): boolean {
    const Post: ln4Map = new ln4Map();
    Post.set('DocCatId', catid);
    Post.set('DocType', 'Forum');
    Post.set('DocId', docid);
    Post.set('DocName', topic);
    return ln4A2Connect.ApiConnect('RestTCanc', forumEvnt, Post);
  }
}
