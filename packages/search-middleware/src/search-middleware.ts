import { StorageStackStore } from './storage-stack-store';
import { MiddlewareStack, StorageInfo, BasicInfo } from '@storagestack/core';
import { TextHill } from '@texthill/core';

export class SearchMiddleware implements MiddlewareStack {

    private textHill: TextHill;

    private indexName = `${this.basePath}index`;

    constructor(private basePath: string = '') { 
        this.textHill = new TextHill(new StorageStackStore(this.basePath));
    }

    async search(text: string) {
        return await this.textHill.search(text); 
    }

    set(storageInfo: StorageInfo, next: () => void) {
        // add content to index
        if (storageInfo.name.indexOf(this.indexName) === -1 ) {
            this.textHill.feedDoc(storageInfo.name, storageInfo.content).then(_ => {
                next();
            }, (err) => {
                console.error(err);
                next();
            });
        }  
    }
    
    get(storageInfo: StorageInfo, next: () => void) {
        next();
    }

    delete?(basicInfo: BasicInfo, next: () => void) {
        if (basicInfo.name.indexOf(this.indexName) === -1 ) {
        // remove content from index
            this.textHill.removeDoc(basicInfo.name).then(_ => {
                next();
            }, (err) => {
                console.error(err);
                next();
            });
        }
    }
}

