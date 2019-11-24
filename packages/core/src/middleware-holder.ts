export interface BasicInfo {
    name: string;
}

export interface StorageInfo extends BasicInfo {
    content: any;
    origin: any;
    options?: Object;
}

export class MiddlewareHolder {
    constructor() {}
      
    public use(fn) {
        this.go = ((stack) => (...args) => stack(...args.slice(0, -1), () => {
          let _next = args[args.length - 1];
          fn.apply(this, [...args.slice(0, -1), _next.bind.apply(_next, [null, ...args.slice(0, -1)])]);
        }))(this.go);
    }
      
    public go(...args) {
        let _next = args[args.length - 1];
        _next.apply(this, args.slice(0, -1));
    }

}