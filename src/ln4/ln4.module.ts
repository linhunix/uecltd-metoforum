export class ln4Manager {
    private static instance:ln4Manager;
    private config:Map<string,string>; 
    private service:Map<string,any>;
    private lastdata:Map<string,any>;
    private laststatus:number;
    /**
     * initializze the class
     */
    private constructor() {
        this.config=new Map<string,string>();  
        this.service=new Map<string,any>();
        this.laststatus=0;
    }
    /**
     * 
     */
    public static GetInstance():ln4Manager{
        if (this.instance==null){
            this.instance = new ln4Manager();
        }
        return this.instance;
    }
    public setService(name:string,serviceclass:any){
        this.service.set(name,serviceclass);
    }
    public getService(name:string):any{
        if (this.service.has(name)){
            return this.service.get(name);
        }
        return null;
    }
    private setcfg(name:string,value:string) {
        this.config.set(name,value);
    }
    public getcfg(name:string):string{
        if (this.config.has(name)){
            return this.config.get(name);
        }
        return "";
    }
    public getdata($name:string):any{
        if (this.lastdata!=null){
            if(this.lastdata.has(name)){
                return this.lastdata.get(name);
            }
        }
        return null;
    }
    public getstatus ():number{
        return this.laststatus;
    }
}