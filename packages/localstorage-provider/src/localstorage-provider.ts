declare var localStorage;
import { Provider } from '@storagestack/core';
import SecureLS from 'secure-ls';

export class LocalStorageProvider implements Provider<string> {

    private storage = new SecureLS();

    constructor() { }

    async set(name: string, content: string, options?: any): Promise<string> {
        if (options && options.encrypt) {
            this.storage.set(name, content);
            return '';
        } else {
            return await localStorage.setItem(name, content);
        }
    }

    async get(name: string, options?: any): Promise<string> {
        if (options && options.decrypt) {
            const item = this.storage.get(name);
            return item;
        } else {
            return await localStorage.getItem(name);
        }
    }

    delete(name: string, options?: any): Promise<void> {
        return localStorage.removeItem(name);
    }
}