import { Provider } from '@storagestack/core';
import { BlockStackApi } from './blockstack-api';

export class BlockstackProvider implements Provider<string> {

    private blockStackApi: BlockStackApi;

    constructor(private blockstackApi: BlockStackApi) {  }

    set(name: string, content: string, options: Object): Promise<string> {
        return this.blockStackApi.putFile(name, content, options);
    }
    get(name: string, options: Object): Promise<string> {
        return this.blockStackApi.getFile(name, options);
    }
    delete(name: string, options: Object): Promise<void> {
        return this.blockStackApi.deleteFile(name);
    }
}