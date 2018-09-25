
/**
 * @author Andrea Morello - <andrea.morello@linhunix.com>
 * @description Configuration manager Class
 * 
*/
/**
 * gestione eventi interni
 */
export const ln4Manager_IsWrite: string = "CanWrite";
export const ln4Manager_IsChange: string = "Change";
/**
 * boolean conversion 
 */
export const ln4Manager_BooleanTrue: string = "YES";
export const ln4Manager_BooleanFalse: string = "NO";
/**
 * eventi esterni correlati
 */
export const ln4Manager_evtConfig: string = "Config";
export const ln4Manager_evtLanguage: string = "Language";
export const ln4Manager_evtProfile: string = "Profile";
export const ln4Manager_evtUpdate: string = "Update";
export class ln4Manager {
    private static instance: ln4Manager;
    private config: Map<string, any>;
    private language: Map<string, any>;
    private profile: Map<string, any>;
    private service: Map<string, any>;
    private data: Map<string, any>;
    /**
     * initializze the class
     */
    private constructor() {
        this.config = new Map<string, any>();
        this.profile = new Map<string, any>();
        this.language = new Map<string, any>();
        this.service = new Map<string, any>();
        this.data = new Map<string, any>();
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
    // Mapping 
    //////////////////////////////////////////////////////////////////
    private static JsonObjToMapLSub(myInput: object): Map<string, any> {
        let output: Map<string, any>;
        output = new Map<string, any>();
        for (let s of Object.keys(myInput)) {
            if (myInput[s] instanceof Object) {
                output.set(s, ln4Manager.JsonObjToMapLSub(myInput[s]));
            } else {
                output.set(s, myInput[s]);
            }
        }
        return output;
    }
    public static JsonObjToMap(myJson: object): Map<string, any> {
        let output: Map<string, any>;
        output = new Map<string, any>();
        for (let k of Object.keys(myJson)) {
            if (myJson[k] instanceof Object) {
                output.set(k, ln4Manager.JsonObjToMapLSub(myJson[k]));
            } else {
                output.set(k, myJson[k]);
            }
        }
        return output;
    }
    private static MaptoJsonSub(MyIn: Map<string, any>) {
        let res: any = Object.create(null);
        MyIn.forEach((Value: any, key: string) => {
            if (Value instanceof Map) {
                res[key] = ln4Manager.MaptoJsonSub(Value);
            } else {
                res[key] = Value;
            }
        });
        return res;
    }
    public static MaptoJsonObj(myInput: Map<string, any>): object {
        if (myInput == null) { return null; }
        if (myInput instanceof Map) {
            return ln4Manager.MaptoJsonSub(myInput);
        }
        return null;
    }
    //////////////////////////////////////////////////////////////////
    // config
    //////////////////////////////////////////////////////////////////
    public cfgGet(name: string): any {
        if (this.config.has(name)) {
           return this.config.get(name);
        }
        return null;
    }
    private cfgIsWrite(): boolean {
        let enable = this.cfgGet(ln4Manager_IsWrite);
        if (enable == null) {
            this.config.set(ln4Manager_IsWrite, ln4Manager_BooleanTrue);
            enable = ln4Manager_BooleanTrue;
        }
        if (ln4Manager_BooleanTrue == enable) {
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
    private profileIsWrite(): boolean {
        var enable = this.profileGet(ln4Manager_IsWrite);
        if (enable == null) {
            this.profile.set(ln4Manager_IsWrite, ln4Manager_BooleanTrue);
            enable = ln4Manager_BooleanTrue;
        }
        if (enable == ln4Manager_BooleanTrue) {
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
        if (this.language.has(word)) {
            return this.language.get(word);
        }
        return word;
    }
    //////////////////////////////////////////////////////////////////
    // service
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
    // data
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
                    this.config = this.dataExport(type);
                    return true;
                }
                break;
            case ln4Manager_evtProfile:
                if (this.profileIsWrite()) {
                    this.profile = this.dataExport(type);
                    return true;
                }
                break;
            case ln4Manager_evtLanguage:
                this.language = this.dataExport(type);
                return true;
            default:
                return false;
        }
    }
}