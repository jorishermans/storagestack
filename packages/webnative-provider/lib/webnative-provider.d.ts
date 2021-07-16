import { Provider } from '@storagestack/core';
import * as wn from 'webnative';
export declare class WebNativeProvider implements Provider<String> {
    private state;
    private publish?;
    constructor(state: wn.State, publish?: boolean | undefined);
    set(name: string, content: string, options?: any): Promise<string>;
    get(name: string, options?: any): Promise<string>;
    delete(name: string, options?: any): Promise<void>;
}
