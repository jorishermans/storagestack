declare var require;
import { Provider } from "./provider";
import { MiddlewareStack } from "./middleware-stack";
import { MiddlewareHolder, StorageInfo, BasicInfo } from "./middleware-holder";
const minimatch = require("minimatch");

interface PatternProvider {
    pattern: string;
    provider: Provider<any>;
}

export class Application {
    private _providers: PatternProvider[];
    private _middleware: MiddlewareStack[];

    // middleware holders for our api
    private _setMiddleware: MiddlewareHolder;
    private _getMiddleware: MiddlewareHolder;
    private _deleteMiddleware: MiddlewareHolder;

    constructor() {
        this._providers = [];
        this._middleware = [];
        this._setMiddleware = new MiddlewareHolder();
        this._getMiddleware = new MiddlewareHolder();
        this._deleteMiddleware = new MiddlewareHolder();
    }

    public registerProvider(provider: Provider<any>, pattern: string = '*') {
        this._providers.push({provider: provider, pattern: pattern});
    }

    public use(pattern: string, middleware: MiddlewareStack) {
        // route.match('/my/fancy/route/page/7')
        this._middleware.push(middleware);
        this._setMiddleware.use((si: StorageInfo, next: () => void) => this.checkRoute(pattern, si, next, (si, next) => middleware.set(si, next)));
        this._getMiddleware.use((si: StorageInfo, next: () => void) => this.checkRoute(pattern, si, next, (si, next) => middleware.get(si, next)));
        this._deleteMiddleware.use((bi: BasicInfo, next: () => void) => this.checkRoute(pattern, bi, next, (bi, next) => middleware.delete ? middleware.delete(bi, next) : next()));
    }

    private checkRoute(pattern: string, basicInfo: BasicInfo, next: () => void, fn: (BasicInfo, Function) => void) {
        let isMatch = minimatch(basicInfo.name, pattern);
        if (isMatch) {
            fn(basicInfo, next);
        } else {
            next();
        }
    }

    set(name: string, content: any, options?: Object): Promise<void> {
        let promise;
        this._setMiddleware.go({origin: content, content: content, name: name, options: options}, (storageInfo: StorageInfo) => {
            // apply this to the providers
            let promises: Promise<string>[] = [];
            this.mapProvidersByName(name).forEach(p => {
                if (p) promises.push(p.set(name, storageInfo.content, storageInfo.options));
            });
            promise = Promise.all(promises);
        });
        return promise;
    }

    get(name: string, fn: (arg0: StorageInfo) => void, options?: Object) {
        let listOfProviders = this.mapProvidersByName(name);
        if (listOfProviders.length > 0) {
            this.last(listOfProviders).get(name, options).then(s => {
                this._getMiddleware.go({origin: s, content: s, name: name, options: options}, (storageInfo: StorageInfo) => {
                    fn(storageInfo);
                });
            });
        }
    }

    delete(name: string, fn?: (arg0: BasicInfo) => void, options?: Object) {
        let listOfProviders = this.mapProvidersByName(name);
        if (listOfProviders.length > 0) {
            this.last(listOfProviders).delete(name, options).then(s => {
                this._deleteMiddleware.go({name: name, options: options}, fn ? fn : (ss) => {});
            });
        }
    }

    private last(list): Provider<any> {
        return list[list.length - 1];
    }

    private mapProvidersByName(name: string) {
        return this._providers.map(p => {
            let isMatch = minimatch(name, p.pattern);
            if (isMatch) {
                return p.provider;
            }
        }).filter(p => p !== undefined);
    }

}