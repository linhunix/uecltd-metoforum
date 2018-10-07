export class ln4Map implements Map<string, any> {
    public size: number;
    private prototype: Map<string, any>;
    private status: boolean;
    private message: string;
    constructor(source: Map<string, any> = new Map<string, any>()) {
        this.prototype = source;
        this.status = true;
        this.message = "Done";
    }
    public [Symbol.toStringTag]: "Map";
    public [Symbol.iterator](): IterableIterator<[string, any]> {
        return this.prototype[Symbol.iterator]();
    }
    public clear(): void {
        this.prototype.clear();
    }
    public delete(key: string): boolean {
        return this.prototype.delete(key);
    }
    public forEach(callbackfn: (value: any, key: string, map: Map<string, any>) => void, thisArg?: any): void {
        this.prototype.forEach(callbackfn, thisArg);
    }
    public get(key: string): any {
        return this.prototype.get(key);
    }
    public has(key: string): boolean {
        return this.prototype.has(key);
    }
    public set(key: string, value: any): this {
        this.prototype.set(key, value);
        return this;
    }
    public entries(): IterableIterator<[string, any]> {
        return this.prototype.entries();
    }
    public keys(): IterableIterator<string> {
        return this.prototype.keys();
    }
    public values(): IterableIterator<any> {
        return this.prototype.values();
    }

    private MapToObj(strMap: Map<string, any>) {
        let obj = new Array();
        //for (let k of Array.from(strMap.keys())) {
        strMap.forEach((v: any, k: string) => {
            if (k != '__proto__') {
                let v = strMap.get(k);
                if (v instanceof Map) {
                    obj[k] = this.MapToObj(v);
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
            if (obj[k] instanceof Object) {
                strMap.set(k, this.ObjToMap(obj[k]));
            } else {
                strMap.set(k, obj[k]);
            }
        }
        return strMap;
    }
    public fromJsonString(myJson: string) {
        try {
            this.fromJson(JSON.parse(myJson));
        } catch (e) {
            console.log("ln4Map.fromJsonString:" + e);
        }
    }
    public fromJson(myJson: object): void {
        try {
            this.fromMap(this.ObjToMap(myJson));
        } catch (e) {
            console.log("ln4Map.fromJsonString:" + e);
        }
    }
    public toJsonString(): string {
        try {
            let obj = this.toJson();
            return JSON.stringify(obj);
        } catch (e) {
            console.log("ln4Map.fromJsonString:" + e);
        }
    }
    public toJson(): any {
        try {
            return this.MapToObj(this.prototype);
        } catch (e) {
            console.log("ln4Map.fromJsonString:" + e);
        }
    }
    public fromMap(myMap: Map<string, any>) {
        this.prototype = new Map(myMap);
    }

    public fromAny(src:any):void {
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
        return this.prototype;
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