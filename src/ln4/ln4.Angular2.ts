import { EventEmitter } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ln4Manager } from "./ln4.Manager";
import { Observable } from "rxjs";
import { ln4Map } from "./ln4.Map";

export class ln4Angular2 {
    public static event: Map<string, EventEmitter<String>>;
    public static debug: EventEmitter<String>;
    public static ComponentLib:ln4Map
    public static level: number;
    /**
     * verifica che sia inizializzata come classe statica 
     */
    //////////////////////////////////////////////////////////////////
    // GESTORE DEGLI EVENTI 
    //////////////////////////////////////////////////////////////////
    private static check() {
        if (ln4Angular2.event == null) {
            ln4Angular2.event = new Map<string, EventEmitter<any>>();
        }
    }
    /**
     * passa l'evento 
     * @param name nome evento
     * @param make true se in caso non ci sia debba crearlo 
     * @returns evento
     */
    public static eventGet(name: string, make: boolean = false): EventEmitter<String> {
        ln4Angular2.check();
        ln4Angular2.msgDebug("eventGet:"+name);
        if (ln4Angular2.event.has(name)) {
            return ln4Angular2.event.get(name);
        }
        if (make == true) {
            let myevt: EventEmitter<String> = new EventEmitter<String>(true);
            myevt.subscribe(
                (data: string) => {
                    ln4Angular2.msgInfo(name + ">emit>" + data);
                },
                (data: string) => {
                    ln4Angular2.msgError(name + ">error>" + data);
                },
                (data: string) => {
                    ln4Angular2.msgInfo(name + ">complete>" + data);
                }
            );
            ln4Angular2.event.set(name, myevt);
            return ln4Angular2.event.get(name);
        }
        return null;
    }
    /**
 * passa l'evento 
 * @param name nome evento
 * @param make true se in caso non ci sia debba crearlo 
 * @returns evento
 */
    public static eventSubscribe(name: string, mycall: any, make: boolean = false): boolean {
        ln4Angular2.msgDebug("eventSubscribe:"+name);
        let myevt: EventEmitter<String> = ln4Angular2.eventGet(name, make);
        if (myevt != null) {
            myevt.subscribe(
                (data: string) => {
                    ln4Angular2.msgDebug("eventSubscribeRun:"+name+">>"+data);
                    mycall(data);
                }
            );
            return true;
        }
        return false;
    }

    public static eventEmit(name: string, action: string, make: boolean = false) {
        ln4Angular2.msgDebug("eventEmit:"+name+"="+action);
        let myevt: EventEmitter<String> = ln4Angular2.eventGet(name, make);
        if (myevt != null) {
            myevt.emit(action);
            return true;
        }
        return false;
    }
    /**
     * killa un evento assicurandosi che completi il ciclo vita 
     * @param name nome del evento da killare
     */
    public static eventKill(name: string): void {
        ln4Angular2.check();
        ln4Angular2.msgDebug("eventKill:"+name);
        if (!ln4Angular2.event.has(name)) {
            return;
        }
        let myevt: EventEmitter<String> = ln4Angular2.event.get(name);
        myevt.complete();
        ln4Angular2.event.delete(name);
        ln4Manager.GetInstance().dataClean(name);
    }
    //////////////////////////////////////////////////////////////////
    // DEBUGGER
    //////////////////////////////////////////////////////////////////
    private static debugPrint(data: string) {
        let ln4 = ln4Manager.GetInstance();
        let cfglbl: any = ln4.cfgGet("title");
        let cfgtime: string = new Date().toISOString();
        let cfgmsg: string[] = data.split("|", 2);
        let thislvl: string = "" + ln4.translate("DEBUG-LVL-" + cfgmsg[0]);
        let thismsg: string = "" + ln4.translate("DEBUG-MSG-" + cfgmsg[1]);
        console.log("[" + cfglbl + "]-[" + cfgtime + "]-[" + thislvl + "]-[" + thismsg + "]");
    }
    private static debugMessage(reqlevel: number, message: string) {
        let ln4 = ln4Manager.GetInstance();
        if (ln4Angular2.debug == null) {
            ln4Angular2.debug = new EventEmitter<string>(true);
            ln4Angular2.debug.subscribe((data: string) => {
                ln4Angular2.debugPrint(data);
            });
            let cfglvl: any = ln4.cfgGet("level");
            if (cfglvl != null) {
                ln4Angular2.level = Number.parseInt("" + cfglvl);
            }
            if ((Number.isNaN(ln4Angular2.level) || ln4Angular2.level == null)) {
                ln4Angular2.level = 0;
            }
            ln4Angular2.debug.emit(ln4Angular2.level + "|InitDebug");
        }
        if (reqlevel >= ln4Angular2.level) {
            ln4Angular2.debug.emit(reqlevel + "|" + message);
        }
    }
    public static isDebug():boolean{
        if (1 >= ln4Angular2.level) {
            return true;
        }
        return false;
    }
    public static msgDebug(message: string) {
        ln4Angular2.debugMessage(1, message);
    }
    public static msgInfo(message: string) {
        ln4Angular2.debugMessage(26, message);
    }
    public static msgWarning(message: string) {
        ln4Angular2.debugMessage(51, message);
    }
    public static msgError(message: string) {
        ln4Angular2.debugMessage(76, message);
    }
    public static msgCritical(message: string) {
        ln4Angular2.debugMessage(100, message);
    }
    //////////////////////////////////////////////////////////////////
    // SERVER CALL
    //////////////////////////////////////////////////////////////////

    private static callPost(ApiUrl: string, ApiData: any, http: Http, options: any): Observable<any> {
        ln4Angular2.msgDebug('CallPost:' + ApiUrl);
        let post: any = JSON.stringify(ApiData);
        ln4Angular2.msgDebug(ApiData);
        ln4Angular2.msgDebug(post);
        let obres: Observable<any> = null;
        try {
            obres = http.post(ApiUrl, post, options);
        } catch (e) {
            ln4Angular2.msgError(e);
        }
        return obres;
    }
    private static callGet(ApiUrl: string, http: Http, options: any): Observable<any> {
        ln4Angular2.msgDebug('CallGet:' + ApiUrl);
        let obres: Observable<any> = null;
        try {
            obres = http.get(ApiUrl, options);
        } catch (e) {
            ln4Angular2.msgError(e);
        }
        return obres;
    }
    private static callHeaders(): any {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        //headers.append('Access-Control-Allow-Origin' , '*');
        //headers.append('Access-Control-Allow-Methods' , 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        //headers.append('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        return new RequestOptions({ headers: headers });
    }
    public static callUrl(ApiEvent: string, ApiUrl: string, Data: any, rebuild: boolean = false): boolean {
        ln4Angular2.msgDebug('callUrl:'+ApiUrl+"/"+ApiEvent );
        if (ln4Angular2.isDebug()){
            console.log(Data);
        }
        let ln4: ln4Manager = ln4Manager.GetInstance();
        let httpsrv: any = ln4.serviceGet("http");
        if (httpsrv == null) {
            ln4Angular2.msgWarning("noHttp");
            return false;
        }
        if (httpsrv instanceof Http) {
            ln4Angular2.msgInfo("HttpLoaded");
        } else {
            ln4Angular2.msgWarning("badHttp");
            return false;
        }
        let res: Observable<any>;
        switch (ApiUrl) {
            case null:
            case '':
            case 'undefined':
            case 'NaN':
                ln4Angular2.msgWarning("wrongUrl");
                return false;
        }
        let options = ln4Angular2.callHeaders();
        if (Data == null) {
            res = ln4Angular2.callGet(ApiUrl, httpsrv, options);
        } else {
            if (Data instanceof ln4Map) {
                Data = Data.toJson();
            }
            res = ln4Angular2.callPost(ApiUrl, Data, httpsrv, options);
        }
        if (res == null) {
            ln4Angular2.msgWarning("noPromise");
            return false;
        }
        let httpevt: EventEmitter<String> = ln4Angular2.eventGet(ApiEvent);
        if (httpevt != null) {
            if (rebuild == true) {
                ln4Angular2.eventKill(ApiEvent);
                httpevt = ln4Angular2.eventGet(ApiEvent, true);
            }
        }
        res.toPromise().then((res) => {
            ln4Angular2.msgInfo("EVT-" + ApiEvent);
            let status: number;
            let mln4:ln4Map = new ln4Map();
            if ("_body" in res) {
                mln4.fromJsonString(res._body);
            } else {
                mln4.fromJsonString(res);
            }
            if ("status" in res) {
                status = res.status;
            } else {
                status = 0;
            }
            ln4Angular2.msgDebug("STS=" + status);
            if (ln4Angular2.isDebug()){
                console.log(mln4);
            }
            ln4.dataImport(ApiEvent, mln4);
            ln4Angular2.msgInfo("EVT-" + ApiEvent+"="+ApiEvent);
            ln4Angular2.eventEmit(ApiEvent,ApiEvent,true);
        }).catch((error: any) => {
            ln4Angular2.msgError(error);
            ln4Angular2.eventEmit(ApiEvent,"E=" + error,true);
        });
        return true;
    }
    //////////////////////////////////////////////////////////////////
    // SERVER CALL
    //////////////////////////////////////////////////////////////////
    private static checkLib(){
        if (ln4Angular2.ComponentLib==null){
            ln4Angular2.ComponentLib=new ln4Map();
        }
    }
    public static setCompLib(cname:string,cobj:any){
        ln4Angular2.checkLib();
        ln4Angular2.ComponentLib.set(cname,cobj);
    }
    public static getCompLib(cname:string):any{
        ln4Angular2.checkLib();
        return ln4Angular2.ComponentLib.get(cname);
    }

}