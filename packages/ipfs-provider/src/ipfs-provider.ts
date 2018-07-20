import { Provider } from '@storagestack/core';
import { Buffer } from 'buffer/';

export class IpfsProvider<T> implements Provider<T> {

    constructor(private ipfs) { }

    set(name: string, content: T, options?: Object): Promise<void> {
        if (!name.startsWith('/')) name = `/${name}`;
        console.log(name);
        return this.ipfs.files.write(name, Buffer.from(content), options ? options : { offset: 0, create: true }, (err) => {
            return err? Promise.reject(err) : Promise.resolve();
        });
    }

    get(name: string, options?: Object): Promise<T> {
        if (!name.startsWith('/')) name = `/${name}`;
        console.log(name);
        return this.ipfs.files.read(name, options ? options : { offset: 0 }, (err, buf) => {
            if (err) {
                return Promise.reject(err);
            } else {
                return Promise.resolve(buf.toString('utf8'));
            }
        })
    }

    delete(name: string, options?: Object): Promise<void> {
        if (!name.startsWith('/')) name = `/${name}`;
        return this.ipfs.files.rm(name, options ? options : { recursive: true }, (err) => {
            return Promise.reject(err);
        });
    }
}