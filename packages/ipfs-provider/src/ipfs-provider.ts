import { Provider } from '@storagestack/core';
import { Buffer } from 'buffer/';

export class IpfsProvider<T> implements Provider<T> {

    constructor(private ipfs) { }

    set(name: string, content: T, options?: Object): Promise<void> {
        if (!name.startsWith('/')) name = `/${name}`;
        return new Promise((resolve, reject) => {
            this.ipfs.files.write(name, Buffer.from(content), options ? options : { offset: 0, create: true }, (err) => {
                if (err) reject(err)
                else resolve();
            });
        });
    }

    get(name: string, options?: Object): Promise<T> {
        if (!name.startsWith('/')) name = `/${name}`;
        return new Promise((resolve, reject) => {
            this.ipfs.files.read(name, options ? options : { offset: 0 }, (err, buf) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buf.toString('utf8'));
                }
            })
        });
    }

    delete(name: string, options?: Object): Promise<void> {
        if (!name.startsWith('/')) name = `/${name}`;
        return this.ipfs.files.rm(name, options ? options : { recursive: true }, (err) => {
            return Promise.reject(err);
        });
    }
}