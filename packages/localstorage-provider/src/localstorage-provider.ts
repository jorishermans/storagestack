import { Provider } from '@storagestack/core';
import * as localforage from "localforage";
import SecureLS from 'secure-ls';

export class LocalStorageProvider implements Provider<string> {

    private storage = new SecureLS();

    constructor(options?: any) { 
        localforage.config(options || {
            driver      : localforage.LOCALSTORAGE,
            name        : 'StorageStack',
            version     : 1.0,
            storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
            description : 'this is the local storage provider for storage stack'
        });
    }

    async set(name: string, content: string, options?: any): Promise<string> {
        if (options && options.encrypt) {
            this.storage.set(name, content);
            return '';
        } else {
            return await localforage.setItem(name, content);
        }
    }

    async get(name: string, options?: any): Promise<string> {
        if (options && options.decrypt) {
            const item = this.storage.get(name);
            return item;
        } else {
            return await localforage.getItem(name);
        }
    }

    delete(name: string, options?: any): Promise<void> {
        return localforage.removeItem(name);
    }
}