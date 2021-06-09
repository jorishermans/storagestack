import { ss } from "@storagestack/core";
import { Store } from "@texthill/core";

export class StorageStackStore implements Store {
    
    constructor(private basePath: string) { }

    async getItem(key: string, defaultValue?: any) {
        const storageInfo = await ss.get(`${this.basePath}${key}`);
        return storageInfo.content ?? defaultValue;
    }
    
    async setItem<T>(key: string, data: T): Promise<void> {
        await ss.set(`${this.basePath}${key}`, data);
    }
    
    async removeItem(key: string): Promise<void> {
       await ss.delete(`${this.basePath}${key}`);
    }

}