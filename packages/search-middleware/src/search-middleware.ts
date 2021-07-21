import { StorageStackStore } from './storage-stack-store';
import { MiddlewareStack, StorageInfo, BasicInfo } from '@storagestack/core';
import { TextHill } from '@texthill/core';

export class SearchMiddleware implements MiddlewareStack {

    private textHill: TextHill;

    private indexName = `${this.basePath}index`;

    constructor(private basePath: string = '', private debugging = false) { 
        this.textHill = new TextHill(new StorageStackStore(this.basePath, this.debugging));
    }

    async search(text: string) {
        return await this.textHill.search(text); 
    }

    set(storageInfo: StorageInfo, next: () => void) {
        // add content to index
        if (storageInfo.name.indexOf(this.indexName) === -1 ) {
            if (this.debugging) { console.log('Indexing of document', storageInfo.name, storageInfo.content); }
            this.textHill.feedDoc(storageInfo.name, storageInfo.content).then(_ => {
                if (this.debugging) { console.log('Indexing done', storageInfo.name, storageInfo.content); }
                next();
            }, (err) => {
                console.error(err);
                next();
            });
        } else {
            if (this.debugging) { console.log('No indexing', storageInfo.name, this.indexName); }
            next();
        }
    }
    
    get(storageInfo: StorageInfo, next: () => void) {
        next();
    }

    delete?(basicInfo: BasicInfo, next: () => void) {
        if (basicInfo.name.indexOf(this.indexName) === -1 ) {
        // remove content from index
            if (this.debugging) { console.log('Remove Index of document', basicInfo.name); }
            this.textHill.removeDoc(basicInfo.name).then(_ => {
                next();
            }, (err) => {
                console.error(err);
                next();
            });
        } else {
            if (this.debugging) { console.log('No removal of index file', basicInfo.name, this.indexName); }
            next();
        }
    }
}

