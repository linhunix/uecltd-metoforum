import { ln4Manager } from "./ln4.Manager";
import { Input, Output } from "@angular/core";
import { ln4Map } from "./ln4.Map";

export class ln4BaseComponent {
    /**
     * this is the standard id of the tag 
     */
    @Input("id") public tagId: string = null;
    /**
     * this is the standard input   
     */
    @Input("ctrl") public controlCfg: any = {};    /**
     * this is the standard output 
     * scope.remote is the data collected from system
     */
    @Output("scope") public scope: any = {};

    /**
     * input parametres 
     * as the calling on the config 
     */
    public myPrms: ln4Map = new ln4Map();
        /**
     *  In on ln4 mode 
     */
    public myId: string;
    //////////////////////////////////////////////////////////////////
    // Translate
    //////////////////////////////////////////////////////////////////
    public Translate(name: string): string {
        return ln4Manager.GetInstance().translate(name);
    }
    constructor(){
        
    }
} 