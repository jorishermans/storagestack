import { Provider } from '@storagestack/core';

export class BlockstackProvider implements Provider {

    constructor(private blockstack) {  }

    set(name: string, content: string, options: Object): Promise<void> {
        return this.blockstack.putFile(name, content, {});
    }
    get(name: string, options: Object): Promise<string> {
        return this.blockstack.getFile(name, {});
    }
    delete(name: string, options: Object): Promise<void> {
        return this.blockstack.putFile(name, '', {});
    }
}