export interface Provider {
    set(name: string, content: string, options?: Object): Promise<void>;
    get(name: string, options?: Object): Promise<string>;
    delete(name: string, options?: Object): Promise<void>;
}