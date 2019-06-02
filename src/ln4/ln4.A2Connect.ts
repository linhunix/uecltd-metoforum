import {
  ln4Manager,
  ln4Manager_evtProfile,
  ln4Manager_evtProfileX,
  ln4Manager_evtUpdate
} from './ln4.Manager';
import { ln4Angular2 } from './ln4.Angular2';
import { ln4Map } from './ln4.Map';
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
        let ln4m = ln4Manager.GetInstance();
        let res = ln4m.dataExport(ltype);
        if (res == null) {
          return alert(ln4Manager.GetInstance().translate('Server Time out!!'));
        }
        if (res instanceof ln4Map) {
          ln4Manager.GetInstance().runload(ltype);
        }
      });
    ln4Angular2
      .eventGet(ln4Manager_evtProfile, true)
      .subscribe((ltype: string) => {
        ln4Angular2.msgDebug('runload=' + ltype);
        let ln4m = ln4Manager.GetInstance();
        let res = ln4m.dataExport(ltype);
        if (res == null) {
          return alert(ln4Manager.GetInstance().translate('Server Time out!!'));
        }
        if (res instanceof ln4Map) {
          if (res.has('GroupName')) {
            if (res.get('GroupName') === 'Guest') {
              return alert(ln4Manager.GetInstance().translate('wrong user!!'));
            }
          } else {
            return alert(ln4Manager.GetInstance().translate('Server Reject!!'));
          }
        }
        ln4Manager.GetInstance().runload(ltype);
        let uid = res.get('UserId');
        let uname = res.get('UserName');
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
    let Post: ln4Map = new ln4Map();
    Post.set('DocCatId', catid);
    return ln4A2Connect.ApiConnect('RestCList', forumEvnt, Post);
  }
  public static ForumListApi(catid: number, forumEvnt: string): boolean {
    let Post: ln4Map = new ln4Map();
    Post.set('DocCatId', catid);
    Post.set('DocType', 'Forum');
    return ln4A2Connect.ApiConnect('RestTList', forumEvnt, Post);
  }
  public static ForumListTypeApi(
    forumEvnt: string,
    forumtype: string
  ): boolean {
    let Post: ln4Map = new ln4Map();
    Post.set('DocType', forumtype);
    return ln4A2Connect.ApiConnect('RestNList', forumEvnt, Post);
  }
  public static ForumFindApi(
    catid: number,
    findstr: string,
    forumEvnt: string
  ): boolean {
    let Post: ln4Map = new ln4Map();
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
    let Post: ln4Map = new ln4Map();
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
    let Post: ln4Map = new ln4Map();
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
    let Post: ln4Map = new ln4Map();
    Post.set('DocCatId', catid);
    Post.set('DocType', 'Forum');
    Post.set('DocId', docid);
    Post.set('DocName', topic);
    return ln4A2Connect.ApiConnect('RestTCanc', forumEvnt, Post);
  }
}
