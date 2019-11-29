import { MiddlewareStack, StorageInfo, ss, BasicInfo } from '@storagestack/core';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface HashTableIndex<T> {
    [key: string]: T;
}

export class IndexerMiddleware<T, K> implements MiddlewareStack {

    private index: HashTableIndex<K>;

    private _index$: ReplaySubject<HashTableIndex<K>> = new ReplaySubject<HashTableIndex<K>>(1);
    public get index$(): Observable<HashTableIndex<K>> {
        return this._index$.pipe(filter((v: any) => !!v));
    }

    constructor(private transformer: (name: string, t: T) => K,
                private nameToId: (name: string) => string,
                private indexName: string, private secure = true) {
        this.index = {};
        this.getIndexFile().then((index) => {
            this.index = index ? index : {};
            this._index$.next(index);
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
        const id = this.nameToId(basicInfo.name);

        delete this.index[id];
        this.updateIndex();
    }

    private updateIndex() {
        ss.set(this.indexName, this.index, { encrypt: this.secure });
        this._index$.next(this.index);
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
