import { ss } from "@storagestack/core";
import { Store } from "@texthill/core";

export class StorageStackStore implements Store {
    
    constructor(private basePath: string, private debugging: boolean) { }

    async getItem(key: string, defaultValue?: any) {
        if (this.debugging) { console.log('StorageStack Store: [getItem] ', key, defaultValue); }
        const storageInfo = await ss.get(`${this.basePath}${key}`);
        if (this.debugging) { console.log('StorageStack Store: [getItem Result] -> ', storageInfo); }
        return storageInfo.content ?? defaultValue;
    }
    
    async setItem<T>(key: string, data: T): Promise<void> {
        if (this.debugging) { console.log('StorageStack Store: [setItem] ', key, data); }
        await ss.set(`${this.basePath}${key}`, data);
    }
    
    async removeItem(key: string): Promise<void> {
        if (this.debugging) { console.log('StorageStack Store: [removeItem] ', key); }
       await ss.delete(`${this.basePath}${key}`);
    }

}