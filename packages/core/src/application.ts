import { Provider } from "./provider";
import { MiddlewareStack } from "./middleware-stack";
import { MiddlewareHolder, StorageInfo, BasicInfo } from "./middleware-holder";
import * as minimatch from 'minimatch';

export class Application {
    private _providers: Provider[];
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

    public registerProvider(provider: Provider) {
        this._providers.push(provider);
    }

    public use(path: string, middleware: MiddlewareStack) {
        // route.match('/my/fancy/route/page/7')
        this._middleware.push(middleware);
        this._setMiddleware.use((si: StorageInfo, next) => this.checkRoute(path, si, next, (si, next) => middleware.set(si, next)));
        this._getMiddleware.use((si: StorageInfo, next) => this.checkRoute(path, si, next, (si, next) => middleware.get(si, next)));
        this._deleteMiddleware.use((bi: BasicInfo, next) => this.checkRoute(path, bi, next, (bi, next) => middleware.delete ? middleware.delete(bi, next) : next()));
    }

    private checkRoute(pattern: string, basicInfo: BasicInfo, next: () => void, fn: (BasicInfo, Function) => void) {
        let isMatch = minimatch(basicInfo.name, pattern);
        if (isMatch) {
            fn(basicInfo, next);
        } else {
            next();
        }
    }

    set(name: string, content: string, options?: Object) {
        this._setMiddleware.go({origin: content, content: content, name: name, options: options}, (storageInfo: StorageInfo) => {
            // apply this to the providers
            this._providers.forEach(p => p.set(name, storageInfo.content, storageInfo.options));
        });
    }

    get(name: string, fn: (StorageInfo) => void, options?: Object) {
        this.lastProvider.get(name, options).then(s => {
            this._getMiddleware.go({origin: s, content: s, name: name, options: options}, (storageInfo: StorageInfo) => {
                fn(storageInfo);
            });
        });
    }

    delete(name: string, fn?: (BasicInfo) => void, options?: Object) {
        this.lastProvider.delete(name, options).then(s => {
            this._deleteMiddleware.go({name: name, options: options}, fn ? fn : (ss) => {});
        });
    }

    private get lastProvider(): Provider {
        return this._providers[this._providers.length - 1]
    }

}