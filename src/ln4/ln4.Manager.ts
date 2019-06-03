import { ln4Map } from './ln4.Map';

/**
 * @author Andrea Morello - <andrea.morello@linhunix.com>
 * @description Configuration manager Class
 *
 */
/**
 * gestione eventi interni
 */
export const ln4Manager_IsWrite = 'CanWrite';
export const ln4Manager_IsChange = 'Change';
/**
 * boolean conversion
 */
export const ln4Manager_BooleanTrue = 'YES';
export const ln4Manager_BooleanFalse = 'NO';
/**
 * eventi esterni correlati
 */
export const ln4Manager_evtConfig = 'Config';
export const ln4Manager_evtLanguage = 'Language';
export const ln4Manager_evtProfile = 'Profile';
export const ln4Manager_evtProfileX = 'ProfileX';
export const ln4Manager_evtUpdate = 'Update';

export class ln4Manager {
  private static instance: ln4Manager;
  private config: ln4Map;
  private tag: ln4Map;
  private language: ln4Map;
  private profile: ln4Map;
  private profileX: ln4Map;
  private service: ln4Map;
  private data: ln4Map;
  /**
   * initializze the class
   */
  private constructor() {
    this.config = new ln4Map();
    this.tag = new ln4Map();
    this.profile = new ln4Map();
    this.profileX = new ln4Map();
    this.language = new ln4Map();
    this.service = new ln4Map();
    this.data = new ln4Map();

    console.log('ln4Manager this.profile: ', this.profile);
    console.log('ln4Manager this.profileX: ', this.profileX);
  }
  /**
   *
   */
  public static GetInstance(): ln4Manager {
    if (this.instance == null) {
      this.instance = new ln4Manager();
    }
    return this.instance;
  }

  //////////////////////////////////////////////////////////////////
  // CONFIG
  //////////////////////////////////////////////////////////////////
  public cfgGet(name: string): any {
    if (this.config.has(name)) {
      return this.config.get(name);
    }
    return null;
  }
  public cfgGetTag(name: string): any {
    try {
      if (this.tag.has(name)) {
        return this.tag.get(name);
      }
    } catch (e) {}
    return null;
  }
  private cfgIsWrite(): boolean {
    let enable = this.cfgGet(ln4Manager_IsWrite);
    if (enable == null) {
      this.config.set(ln4Manager_IsWrite, ln4Manager_BooleanTrue);
      enable = ln4Manager_BooleanTrue;
    }
    if (ln4Manager_BooleanTrue === enable) {
      return true;
    }
    return false;
  }
  public cfgSet(name: string, value: string): boolean {
    if (this.cfgIsWrite()) {
      this.config.set(ln4Manager_IsChange, ln4Manager_BooleanTrue);
      this.config.set(name, value);
      return true;
    }
    return false;
  }
  //////////////////////////////////////////////////////////////////
  // profile
  //////////////////////////////////////////////////////////////////
  public profileGet(name: string): any {
    if (this.profile.has(name)) {
      return this.profile.get(name);
    }
    return null;
  }
  public profileXGet(name: string): any {
    if (this.profileX.has(name)) {
      return this.profileX.get(name);
    }
    return null;
  }
  public profileXOGet(name: string): any {
    if (this.profileX.has('Output')) {
      const out = ln4Map.Load(this.profileX.get('Output'));
      if (out.has(name)) {
        return out.get(name);
      }
    }
    return null;
  }
  private profileIsWrite(): boolean {
    let enable = this.profileGet(ln4Manager_IsWrite);
    if (enable == null) {
      this.profile.set(ln4Manager_IsWrite, ln4Manager_BooleanTrue);
      enable = ln4Manager_BooleanTrue;
    }
    if (enable === ln4Manager_BooleanTrue) {
      return true;
    }
    return false;
  }
  public profileSet(name: string, value: string): boolean {
    if (this.profileIsWrite()) {
      this.profile.set(ln4Manager_IsChange, ln4Manager_BooleanTrue);
      this.profile.set(name, value);
      return true;
    }
    return false;
  }
  //////////////////////////////////////////////////////////////////
  // LANGUAGE
  //////////////////////////////////////////////////////////////////
  public translate(word: string): string {
    if (this.language == null) {
      return word;
    }
    if (this.language.has(word)) {
      return this.language.get(word);
    }
    return word;
  }
  //////////////////////////////////////////////////////////////////
  // SERVICE
  //////////////////////////////////////////////////////////////////
  public serviceSet(name: string, serviceclass: any) {
    this.service.set(name, serviceclass);
  }
  public serviceGet(name: string): any {
    if (this.service.has(name)) {
      return this.service.get(name);
    }
    return null;
  }
  //////////////////////////////////////////////////////////////////
  // DATA
  //////////////////////////////////////////////////////////////////
  public dataExport(name: string): any {
    if (this.data.has(name)) {
      return this.data.get(name);
    }
    return null;
  }
  public dataImport(name: string, value: any) {
    this.data.set(name, value);
  }
  public dataClean(name: string) {
    if (this.data.has(name)) {
      this.data.delete(name);
    }
  }

  public runload(type: string): boolean {
    switch (type) {
      case ln4Manager_evtConfig:
        if (this.cfgIsWrite()) {
          this.config.fromAny(this.dataExport(type));
          this.tag.fromAny(this.config.get('tags'));
          return true;
        }
        break;
      case ln4Manager_evtProfile:
        if (this.profileIsWrite()) {
          this.profile.fromAny(this.dataExport(type));
          return true;
        }
        break;
      case ln4Manager_evtProfileX:
        if (this.profileIsWrite()) {
          this.profileX.fromAny(this.dataExport(type));
          return true;
        }
        break;
      case ln4Manager_evtLanguage:
        this.language.fromAny(this.dataExport(type));
        return true;
      default:
        return false;
    }
  }

  //////////////////////////////////////////////////////////////////
  // Tools
  //////////////////////////////////////////////////////////////////

  /**
   * Dates today
   * @returns today
   */
  public dateToday(): string {
    const now = new Date();
    const todayDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    return (
      todayDate.getFullYear() +
      '-' +
      (todayDate.getMonth() + 1) +
      '-' +
      todayDate.getDate() +
      ' ' +
      todayDate.getHours() +
      ':' +
      todayDate.getMinutes() +
      ':' +
      todayDate.getSeconds()
    );
  }
}
