export class ln4Map {
    public size: number;
    private prototype: any;
    private status: boolean;
    private message: string;
    constructor(source: any = {}) {
        this.prototype = source;
        this.status = true;
        this.message = "Done";
    }
    public [Symbol.toStringTag]: "Map";
    public [Symbol.iterator](): IterableIterator<[string, any]> {
        return this.prototype[Symbol.iterator]();
    }
    public clear(): void {
        this.prototype = {};
    }
    public has(key: string): boolean {
        if (key in this.prototype) {
            return true;
        }
        return false;
    }
    public delete(key: string): boolean {
        if (this.has(key) == false) {
            return false;
        }
        if (delete this.prototype[key]) {
            return true;
        }
        return false;
    }
    public get(key: string): any {
        if (this.has(key) == false) {
            return null;
        }
        return this.prototype[key];
    }
    public set(key: string, value: any): this {
        this.prototype[key] = value;
        return this;
    }
    public setFromAny(key: string, value: any): this {
        let src:ln4Map= new ln4Map();
        src.fromAny(value)
        this.prototype[key] = src.toJson();
        return this;
    }
    public keys(): string[] {
        return Object.keys(this.prototype);
    }
    public values(): any[] {
        return Object.values(this.prototype);
    }
    public forEach(callback) {
        for (let k in this.prototype) {
            let v = this.prototype[k];
            callback(k, v);
        }
    }

    private MapToObj(strMap: Map<string, any>) {
        let obj = new Array();
        //for (let k of Array.from(strMap.keys())) {
        strMap.forEach((v: any, k: string) => {
            if ((k != '__proto__')&&(k != "prototype")) {
                let v = strMap.get(k);
                if (typeof obj[k].toJson == "function") {
                    strMap.set(k, obj[k].toJson());
                } else if (typeof obj[k].toString == "function") {
                    strMap.set(k, obj[k].toString());
                } else {
                    obj[k] = v;
                }
            }
        });
        return obj;
    }
    private ObjToMap(obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            if ((k != '__proto__')&&(k != "prototype")) {
                if (obj[k] instanceof Object) {
                    if (typeof obj[k].toJson == "function") {
                        strMap.set(k, obj[k].toJson());
                    } else if (typeof obj[k].toString == "function") {
                        strMap.set(k, obj[k].toString());
                    } else {
                        strMap.set(k, this.ObjToMap(obj[k]));
                    }
                }else {
                    strMap.set(k, obj[k]);
                }
            }
        }
        return strMap;
    }
    public fromJsonString(myJson: string) {
        try {
            this.fromJson(JSON.parse(myJson));
        } catch (e) {
            this.returnKO("ln4Map.fromJsonString:" + e);
        }
    }
    public fromJson(myJson: object): void {
        this.prototype = myJson;
    }
    public toJsonString(): string {
        try {
            let obj = this.toJson();
            return JSON.stringify(obj);
        } catch (e) {
            this.returnKO("ln4Map.toJsonString:" + e);
        }
    }
    public toJson(): any {
        return this.prototype;
    }
    public fromMap(myMap: Map<string, any>) {
        try {
            this.prototype = this.MapToObj(myMap);
        } catch (e) {
            this.returnKO("ln4Map.fromMap:" + e);
        }
    }

    public fromAny(src: any): void {
        if (src==null){
            this.clear();
            return;
        }
        if (src instanceof ln4Map) {
            this.prototype = src.prototype;
        } else if (src instanceof Map) {
            this.fromMap(src);
        } else if (src instanceof String) {
            this.fromJsonString("" + src);
        } else {
            this.fromJson(src);
        }
    }
    public toMap(): Map<string, any> {
        try {
            return this.ObjToMap(this.prototype);
        } catch (e) {
            this.returnKO("ln4Map.toMap:" + e);
        }
    }
    public returnOK(message: string = "OK"): this {
        this.message = message;
        this.status = true;
        return this;
    }
    public returnKO(message: string = "KO"): this {
        this.message = message;
        this.status = false;
        return this;
    }
    public getStatus(): boolean {
        return this.status;
    }
    public getMessage(): string {
        return this.message
    }

}