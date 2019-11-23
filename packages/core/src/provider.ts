export interface Provider<T> {
    set(name: string, content: T, options?: any): Promise<string>;
    get(name: string, options?: any): Promise<T>;
    delete(name: string, options?: any): Promise<void>;
}