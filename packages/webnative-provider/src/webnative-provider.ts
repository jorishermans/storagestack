import { Provider } from '@storagestack/core';
import * as wn from 'webnative';

export class WebNativeProvider implements Provider<String> {

    constructor(private state: wn.State, private publish?: boolean) { }

    async set(name: string, content: string, options?: any): Promise<string> {
        if (this.state && this.state.authenticated && this.state.fs) {
            const args = name.split('/');
            const startFs = options && options.encrypt ? 'private' : 'public';
            await this.state.fs.write(wn.path.file(startFs, ... args ), content);
            if (this.publish) { await this.state?.fs?.publish(); }
        }
        return name;
    }

    async get(name: string, options?: any): Promise<string> {
        if (this.state && this.state.authenticated && this.state.fs) {
            const args = name.split('/');
            const startFs = options && options.encrypt ? 'private' : 'public';
            const file = await this.state.fs.cat(wn.path.file(startFs, ... args ));
            return file.toString();
        }
        return '';
    }

    async delete(name: string, options?: any): Promise<void> {
        if (this.state && this.state.authenticated && this.state.fs) {
            const args = name.split('/');
            const startFs = options && options.encrypt ? 'private' : 'public';
            await this.state.fs.rm(wn.path.file(startFs, ... args ));
        }
    }
}