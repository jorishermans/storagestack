import { Provider } from '@storagestack/core';
import { Storage } from '@stacks/storage';
import { UserSession } from '@stacks/auth';

export class BlockstackProvider implements Provider<string> {

    constructor(public storage: Storage, public userSession: UserSession) {  }

    set(name: string, content: string, options?: any): Promise<string> {
        if (this.userSession.isUserSignedIn()) {
            return this.storage.putFile(name, content, options);
        } else {
            return Promise.resolve('');
        }
    }

    async get(name: string, options?: any): Promise<string> {
        if (this.userSession.isUserSignedIn() || options.username) {
            const s = await this.storage.getFile(name, options);
            if (typeof s === 'string') {
                return s;
            } else if (s instanceof ArrayBuffer) {
                let content: string = '';
                (new Uint8Array(s)).forEach((byte: number) => {
                    content += String.fromCharCode(byte);
                });
                return content;
            } else { return ''; }
        }
        else {
            return '';
        }
    }
    async delete(name: string, options?: Object): Promise<void> {
        if (this.userSession.isUserSignedIn()) {
            return await this.storage.deleteFile(name);
        } 
    }
}