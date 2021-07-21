import { Provider } from '@storagestack/core';
import * as wn from 'webnative';

export class WebNativeProvider implements Provider<String | null> {

    constructor(private state: wn.State, private publish?: boolean) { }

    async set(name: string, content: string, options?: any): Promise<string> {
        if (this.state && this.state.authenticated && this.state.fs) {
            let args = name.split('/');
 
           if (args[0] !== 'private' && args[0] !== 'public') {
               args = [options && options.encrypt ? 'private' : 'public', ... args];
           }
           await this.state.fs.write(wn.path.file( ... args ), content);
           if (this.publish) { await this.state?.fs?.publish(); }
        }
        return name;
    }

    async get(name: string, options?: any): Promise<string | null> {
        if (this.state && this.state.authenticated && this.state.fs) {
            let args = name.split('/');
 
            if (args[0] !== 'private' && args[0] !== 'public') {
                args = [options && options.encrypt ? 'private' : 'public', ... args];
            }
            const path = wn.path.file( ... args );
            const exists = await this.state.fs.exists(path);
            if (exists) {
                const file = await this.state.fs.cat(path);
                return file ? file.toString() : null;
            } else {
                console.warn('file don\'t exist', name);
                return null;
            }
        }
        return null;
    }

    async delete(name: string, options?: any): Promise<void> {
        if (this.state && this.state.authenticated && this.state.fs) {
            let args = name.split('/');
 
            if (args[0] !== 'private' && args[0] !== 'public') {
                args = [options && options.encrypt ? 'private' : 'public', ... args];
            }
            await this.state.fs.rm(wn.path.file( ... args ));
        }
    }
}