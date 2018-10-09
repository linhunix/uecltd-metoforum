import { Input, ViewChild, Output } from "@angular/core";
import { ln4Angular2 } from "./ln4.Angular2";
import { ln4Manager_evtUpdate, ln4Manager, ln4Manager_evtConfig, ln4Manager_evtProfile, ln4Manager_evtLanguage } from "./ln4.Manager";
import { ln4Map } from "./ln4.Map";

export class ln4A2SimpleComp {
    /**
     * input parametres 
     * as the calling on the config 
     */
    public myPrms: ln4Map = new ln4Map();
    @Input("ln4in") set ln4in(ln4in: any) {
        this.myPrms = new ln4Map();
        this.myPrms.fromAny(ln4in)
        this.reload(ln4Manager_evtUpdate);
    }
    /**
     *  In on ln4 mode 
     */
    public myId: string;
    @Input("ln4id") set ln4id(name: string) {
        this.myId = name;
        this.reload(ln4Manager_evtUpdate);
    }
    /**
     * this is the standard id of the tag 
     */
    @Input("id") public tagId: string = null;
    /**
     * this is the standard output 
     * scope.remote is the data collected from system
     */
    @Output("scope") public scope: any = {};
    /**
     * this is the parametres used on method do action 
     */
    public myaction: any = null;
    /**
     * the previous action used on this element 
     */
    public lastaction: string = "";
    /**
     * the current action used on this element
     */
    public currentaction: string = "";
    //////////////////////////////////////////////////////////////////
    // Translate
    //////////////////////////////////////////////////////////////////
    public Translate(name: string): string {
        return ln4Manager.GetInstance().translate(name);
    }
    //////////////////////////////////////////////////////////////////
    // Trace is a test suite 
    //////////////////////////////////////////////////////////////////
    public trace(src: any): any {
        if (ln4Angular2.isDebug()) {
            console.log("trace:" + this.myId);
            console.log("-->StartVal:");
            console.log(src);
            console.log("-->EndVal");
        }
        return src;
    }
    public traceToString(src: any): string {
        src = this.trace(src);
        if (typeof src.toString == 'function') {
            return src.toString();
        }
        return "" + src
    }
    /**
     * Convert a object to a json string value 
     * if is debug mode dump on console the values 
     * @param src object 
     * @returns string jsn covertente
     */
    public traceJsonString(src: any): any {
        src = this.trace(src);
        let dst: ln4Map = new ln4Map();
        dst.fromAny(src);
        return dst.toJsonString();
    }
    //////////////////////////////////////////////////////////////////
    // RELOAD CONFIG
    //////////////////////////////////////////////////////////////////
    /**
     * get form manager config info about ln4id
     * @param mysrc 
     */
    private reloadCfgById(mysrc: ln4Map): ln4Map {
        let res: ln4Map = new ln4Map();
        res.fromAny(ln4Manager.GetInstance().cfgGet(this.myId));
        res.forEach(function (key: string, value: string) {
            mysrc.set(key, value);
        });
        res.fromAny(ln4Manager.GetInstance().cfgGetTag(this.myId));
        res.forEach(function (key: string, value: string) {
            mysrc.set(key, value);
        });
        return mysrc;
    }
    /**
     * get form manager data getting info about ln4id
     * @param mysrc 
     */
    private reloadDatById(mysrc: ln4Map): ln4Map {
        let res: ln4Map = new ln4Map();
        res.fromAny(ln4Manager.GetInstance().dataExport(this.myId));
        res.forEach(function (key: string, value: string) {
            mysrc.set(key, value);
        });
        return mysrc;
    }
    /**
     * get form manager config info about Params
     * @param mysrc 
     */

    private reloadCfgByPrms(mysrc: ln4Map): ln4Map {
        if (this.myPrms.has(ln4Manager_evtConfig)) {
            let res: ln4Map = new ln4Map();
            res.fromAny(this.myPrms.get(ln4Manager_evtConfig));
            res.forEach(function (key: string, value: string) {
                mysrc.set(key, ln4Manager.GetInstance().cfgGet(value));
            });
        }
        return mysrc;
    }
    /**
     * get form manager user info about Params
     * @param mysrc 
     */
    private reloadUsrByPrms(mysrc: ln4Map): ln4Map {
        if (this.myPrms.has(ln4Manager_evtProfile)) {
            let res: ln4Map = new ln4Map();
            res.fromAny(this.myPrms.get(ln4Manager_evtConfig));
            res.forEach(function (key: string, value: string) {
                mysrc.set(key, ln4Manager.GetInstance().profileGet(value));
            });
        }
        return mysrc;
    }

    //////////////////////////////////////////////////////////////////
    // RELOAD 
    //////////////////////////////////////////////////////////////////
    public reload(type: string) {
        this.lastaction = this.lastaction;
        this.currentaction = "reload:" + type;
        try {
            if (ln4Angular2.isDebug()) {
                console.log("ReloadRun:Start>>" + this.myId + ">>" + type);
                console.log(this.myPrms);
            }
            let source: ln4Map = new ln4Map();
            if (this.scope['remote'] != null) {
                source.fromAny(this.scope['remote']);
            }
            if (this.tagId == null) {
                this.tagId = this.constructor.name;
            }
            /// Use the prereload to define if need use the normal 
            /// sequence of reloading 
            source = this.preReload(source, type);
            if (source.getStatus()) {
                if (this.myId != null) {
                    switch (type) {
                        case ln4Manager_evtConfig:
                            source = this.reloadCfgById(source);
                            break;
                        case this.myId:
                            source = this.reloadDatById(source);
                            break;
                        case ln4Manager_evtUpdate:
                            source = this.reloadCfgById(source);
                            source = this.reloadDatById(source);
                            break;
                    }
                }
                if (this.myPrms != null) {
                    switch (type) {
                        case ln4Manager_evtConfig:
                            source = this.reloadCfgByPrms(source);
                            break;
                        case ln4Manager_evtProfile:
                            source = this.reloadUsrByPrms(source);
                            break;
                        case ln4Manager_evtUpdate:
                            source = this.reloadCfgByPrms(source);
                            source = this.reloadUsrByPrms(source);
                            break;
                    }
                }
            } else {
                ln4Angular2.msgDebug("preReload:block loading config on source");
            }
            if (this.scope == null) {
                this.scope = {};
            }
            // use the post load to define if is need to convert the map on scope 
            source = this.postReload(source, type);
            if (source.getStatus()) {
                this.scope.remote = source.toJson();
            } else {
                ln4Angular2.msgDebug("postReload:block converison source to scope");
            }
            if (ln4Angular2.isDebug()) {
                console.log("ReloadRun:Stop>>" + this.myId + ">>" + type);
                console.log(source);
                console.log(this.scope);
            }
        } catch (e) {
            ln4Angular2.msgError(e);
        }
    }
    //////////////////////////////////////////////////////////////////
    // ACTION MANAGER 
    //////////////////////////////////////////////////////////////////
    /**
     * Event based action programmable 
     * manage an global event with myid as name 
     * and the the acttype is the definiction of the event 
     * you can add a parametres and they remain live since 
     * the new event.
     * @param acttype type of action defined 
     * @param parm temporaney parametres used to manage this action 
     */
    public doaction(acttype: string, parm: any = null): void {
        this.myaction = parm;
        this.lastaction = this.currentaction;
        this.currentaction = acttype;
        ln4Angular2.eventEmit(this.myId, acttype, true);
    }
    /**
     * this function called at end of the action return the value 
     * of this.myaction as a scope.action 
     */
    public postaction() {
        if (this.myaction != null) {
            let actin: ln4Map = new ln4Map();
            actin.fromAny(this.myaction);
            this.scope["action"] = actin.toJson();
            this.myaction = null;
        }
    }
    //////////////////////////////////////////////////////////////////
    // SUPER / CONSTRUCTOR 
    //////////////////////////////////////////////////////////////////
    /**
     * empty method to make config parametres 
     * need to called before the reload and subscribe
    */
    public initcfg() {
        // use to make config 
    }
    /**
     * empty method to make config parametres 
     * need to called during  the reload 
     * but first to make all other activites
     * @param source 
     * @param type 
     * @returns ln4map block to continue or not the reload
     */
    public preReload(source: ln4Map, type: string): ln4Map {
        // use to make config 
        return source.returnOK();
    }
    /**
     * empty method to make config parametres 
     * need to called during  the reload 
     * but at end of make all other activites
     * @param type 
     * @returns ln4Map (getStatus():boolean) block to continue or not the maptojson convert
     */
    public postReload(source: ln4Map, type: string): ln4Map {
        // use to make config 
        return source.returnOK();
    }
    /**
     * Default super metod use initcfg to preload config
     * run reaload (if flag true)
     * run subscribe (if flag true)
     * default (true,true)
     * @param boot_reload true if need to run reload 
     * @param boot_subscribe true if need to add subcribe config 
     */
    constructor(boot_reload: boolean = true, boot_subscribe: boolean = true) {
        this.scope = {};
        this.initcfg();
        if (boot_reload) {
            this.reload(ln4Manager_evtUpdate);
        }
        if (boot_subscribe) {
            ln4Angular2.eventGet(ln4Manager_evtUpdate, true).subscribe(
                (ltype: string) => {
                    this.reload(ltype);
                }
            );
        }
    }

}