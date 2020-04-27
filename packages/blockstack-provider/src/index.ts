import { Provider } from '@storagestack/core';
import { UserSession } from 'blockstack';
import * as blockstack from 'blockstack';

var isNode=new Function("try {return this===global;}catch(e){return false;}");

export class BlockstackProvider implements Provider<string> {

    constructor(public userSession: UserSession) {  }

    set(name: string, content: string, options?: any): Promise<string> {
        if (this.userSession.isUserSignedIn()) {
            return isNode ? this.userSession.putFile(name, content, options) : blockstack.putFile(name, content, options);
        } else {
            return Promise.resolve('');
        }
    }

    async get(name: string, options?: any): Promise<string> {
        if (this.userSession.isUserSignedIn() || options.username) {
            const s = await isNode ? this.userSession.getFile(name, options) : blockstack.getFile(name, options);
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
            return await blockstack.deleteFile(name);
        } 
    }
}