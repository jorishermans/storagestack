import { Provider } from '@storagestack/core';
import * as localforage from "localforage";

export class LocalStorageProvider implements Provider<string> {

    constructor(options?: LocalForageOptions) { 
        localforage.config(options || {
            driver      : localforage.LOCALSTORAGE,
            name        : 'StorageStack',
            version     : 1.0,
            storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
            description : 'this is the local storage provider for storage stack'
        });
    }

    set(name: string, content: string, options?: Object): Promise<void> {
        return localforage.setItem(name, content).then(s => Promise.resolve());
    }

    get(name: string, options?: Object): Promise<string> {
        return localforage.getItem(name);
    }

    delete(name: string, options?: Object): Promise<void> {
        return localforage.removeItem(name);
    }
}