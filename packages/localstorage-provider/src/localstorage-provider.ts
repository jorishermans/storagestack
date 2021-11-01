import { Provider } from '@storagestack/core';
import SecureLS from 'secure-ls';

export class LocalStorageProvider implements Provider<string> {

    private storage = new SecureLS();

    constructor() { }

    private get browserStorage() {
        return localStorage;
    }

    async set(name: string, content: string, options?: any): Promise<string> {
        if (options && options.encrypt) {
            this.storage.set(name, content);
            return '';
        } else {
            await localStorage.setItem(name, content);
            return content;
        }
    }

    async get(name: string, options?: any): Promise<string> {
        if (options && options.decrypt) {
            const item = this.storage.get(name);
            return item;
        } else {
            const result = await localStorage.getItem(name);
            return result ? result : '';
        }
    }

    async delete(name: string, options?: any): Promise<void> {
        if (options && options.decrypt) {
            return this.storage.remove(name);
        } else {
            return localStorage.removeItem(name);
        }
    }
}