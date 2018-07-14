export interface Provider<T> {
    set(name: string, content: T, options?: Object): Promise<void>;
    get(name: string, options?: Object): Promise<T>;
    delete(name: string, options?: Object): Promise<void>;
}