import { Provider } from '@storagestack/core';
import * as Buffer from 'Buffer';

export class LocalStorageProvider implements Provider {

    constructor(private ipfs) { }

    set(name: string, content: string, options?: Object): Promise<void> {
        return this.ipfs.files.write(name, Buffer.from(content), options ? options : { offset: 0, create: true }, (err) => {
            return Promise.reject(err);
        });
    }

    get(name: string, options?: Object): Promise<string> {
        return this.ipfs.files.read(name, options ? options : { offset: 0 }, (err, buf) => {
            if (err) {
                return Promise.reject(err);
            } else {
                return Promise.resolve(buf.toString('utf8'));
            }
        })
    }

    delete(name: string, options?: Object): Promise<void> {
        return this.ipfs.files.rm(name, options ? options : { recursive: true }, (err) => {
            return Promise.reject(err);
        });
    }
}