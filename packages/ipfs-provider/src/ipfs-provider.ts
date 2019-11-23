import { Provider } from '@storagestack/core';

export class IpfsProvider implements Provider<String> {

    constructor(private ipfs) { }

    set(name: string, content: string, options?: Object): Promise<string> {
        return this.write(name, content, options).then(_ => {
            return this.get(name, undefined).then(x => {
                if ( x.length > content.length ) {
                    // content is not the same
                    let size = x.length - content.length;
                    let str = content + new Array(size + 1).join(' ');
                    // rewrite new str
                    return this.write(name, str, {... options, length: x.length});
                } else {
                    throw 'NotFoundException';
                }
            })
        })
    }

    private write(name: string, content: string, options?: Object): Promise<string> {
        if (!name.startsWith('/')) name = `/${name}`;
        return new Promise((resolve, reject) => { 
                this.ipfs.files.write(name, this.ipfs.types.Buffer.from(content, 'utf8'), options ? options : { offset: 0, create: true }, (err) => {
                    if (err) reject(err)
                    else resolve(name);
                });
        });
    }

    get(name: string, options?: Object): Promise<string> {
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