import { MiddlewareStack, StorageInfo, ss, BasicInfo } from '@storagestack/core';

export interface HashTableIndex<T> {
    [key: string]: T;
}

export class IndexerMiddleware<T, K> implements MiddlewareStack {

    public listen!: (index: HashTableIndex<K>) => void;
    private index: HashTableIndex<K>;

    constructor(private transformer: (name: string, t: T) => K,
                private nameToId: (name: string) => string,
                private indexName: string, private secure = true) {
        this.index = {};
        this.getIndexFile().then((index) => {
            this.index = index ? index : {};
            if (this.listen) { this.listen(index); }
        });
    }

    public set(storageInfo: StorageInfo, next: () => void) {
        if (this.indexName !== storageInfo.name) {
             // transform content so that only the indexed parts are coming into the index
            const content = storageInfo.origin;
            const transformed = this.transformer(storageInfo.name, content);
            const id = this.nameToId(storageInfo.name);
            this.index[id] = transformed;

            this.updateIndex();
        }
        next();
    }

    public get(storageInfo: StorageInfo, next: () => void) {
        // when getting a file we don't need to adapt the index
        next();
    }

    public delete(basicInfo: BasicInfo, next: () => void): any {
        if (this.indexName !== basicInfo.name) {
            const id = this.nameToId(basicInfo.name);

            delete this.index[id];
            this.updateIndex();
        }
    }

    private updateIndex() {
        ss.set(this.indexName, this.index, { encrypt: this.secure });
        if (this.listen) { this.listen(this.index); }
    }

    private async getIndexFile(): Promise<HashTableIndex<K>> {
        const s = await ss.get(this.indexName, {decrypt: this.secure });
        if (s) {
            return s.content;
        } else {
            return {};
        }
    }
}
