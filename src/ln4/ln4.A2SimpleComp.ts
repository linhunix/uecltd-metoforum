import { Input, ViewChild, Output } from "@angular/core";
import { ln4Angular2 } from "./ln4.Angular2";
import { ln4Manager_evtUpdate, ln4Manager, ln4Manager_evtConfig, ln4Manager_evtProfile, ln4Manager_evtLanguage } from "./ln4.Manager";

export class ln4A2SimpleComp {
    @Input("in") myPrms: Map<string, any> = new Map();
    @Input("id") myId: string = "";
    public scope: any = {};
    public mycfg: any = null;
    public myusr: any = null;
    public mydat: any = null;
    private reloadCfgById() {
        this.mycfg = ln4Manager.GetInstance().cfgGet(this.myId);
    }
    private reloadUsrById() {
        this.mycfg = ln4Manager.GetInstance().profileGet(this.myId);
    }
    private reloadDatById() {
        this.mycfg = ln4Manager.GetInstance().dataExport(this.myId);
    }
    private reloadCfgByPrms() {
        if (this.myPrms.has(ln4Manager_evtConfig)) {
            let cfglst: any = this.myPrms.get(ln4Manager_evtConfig);
            if (cfglst instanceof Map) {
                cfglst.forEach((value: string, key: string) => {
                    this.scope[key] = ln4Manager.GetInstance().cfgGet(value);
                });
            }
        }
    }
    private reloadUsrByPrms() {
        if (this.myPrms.has(ln4Manager_evtProfile)) {
            let cfglst: any = this.myPrms.get(ln4Manager_evtProfile);
            if (cfglst instanceof Map) {
                cfglst.forEach((value: string, key: string) => {
                    this.scope[key] = ln4Manager.GetInstance().profileGet(value);
                });
            }
        }
    }
    private reloadLngByPrms() {
        if (this.myPrms.has(ln4Manager_evtLanguage)) {
            let cfglst: any = this.myPrms.get(ln4Manager_evtLanguage);
            if (cfglst instanceof Map) {
                cfglst.forEach((value: string, key: string) => {
                    this.scope[key] = ln4Manager.GetInstance().translate(value);
                });
            }
        }
    }
    public reload(type: string) {
        if (this.myId != "") {
            switch (type) {
                case ln4Manager_evtConfig:
                    this.reloadCfgById();
                    break;
                case ln4Manager_evtProfile:
                    this.reloadUsrById();
                    break;
                case this.myId:
                    this.reloadDatById();
                    break;
                case ln4Manager_evtUpdate:
                    this.reloadCfgById();
                    this.reloadUsrById();
                    this.reloadDatById();
                    break;
            }
        }
        if (this.myPrms != null) {
            switch (type) {
                case ln4Manager_evtConfig:
                    this.reloadCfgByPrms();
                    break;
                case ln4Manager_evtProfile:
                    this.reloadUsrByPrms();
                    break;
                case ln4Manager_evtLanguage:
                    this.reloadLngByPrms();
                    break;
                case ln4Manager_evtUpdate:
                    this.reloadCfgByPrms();
                    this.reloadUsrByPrms();
                    this.reloadLngByPrms();
                    break;

            }
        }

    }

    public getKeyArray(mymap: Map<string, any>): Array<String> {
        if (mymap == null) {
            ln4Angular2.msgWarning("getKeyArray=nullstr");
            return [];
        }
        return Array.from(mymap.keys());
    }
    public getItmArray(mymap: Map<string, any>, item: string, sub): Array<String> {
        if (mymap == null) {
            ln4Angular2.msgWarning("getKeyArray=nullstr");
            return [];
        }
        if (mymap.has(name)) {
            let submap = mymap.get(name);
            if (submap instanceof Map) {
                return Array.from(submap.keys());
            }
        }
        return [];
    }
    public getSubArray(mymap: Map<string, any>, name: string, sub: string = "value"): Array<String> {
        if (mymap == null) {
            ln4Angular2.msgWarning("getKeyArray=nullstr");
            return [];
        }
        if (mymap.has(name)) {
            let submap = mymap.get(name);
            if (submap instanceof Map) {
                if (submap.has(sub)) {
                    let resmap = submap.get(sub);
                    if (resmap instanceof Map) {
                        return Array.from(resmap.keys());
                    }
                }
            }
        }
        return [];
    }
    public getValueStr(mymap: Map<string, any>, name: string, sub: string = ""): String {
        if (mymap == null) {
            ln4Angular2.msgWarning("getValueStr=nullstr");
            return "";
        }
        if (mymap.has(name)) {
            let submap = mymap.get(name);
            if (sub == "") {
                return "" + submap;
            }
            if (submap instanceof Map) {
                if (submap.has(sub)) {
                    return "" + submap.get(sub);
                }
            }
        }
        return "";
    }
    constructor() {
        this.reload(ln4Manager_evtUpdate);
        ln4Angular2.eventGet(ln4Manager_evtUpdate, true).subscribe((type: string) => { this.reload(type); });
    }
}