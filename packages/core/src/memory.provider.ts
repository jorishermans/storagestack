import { Provider } from './provider';

export class MemoryProvider<T> implements Provider<T> {
    
    private memory: { [path: string]: T };

    constructor(memory?: { [path: string]: T }) {
        this.memory = {};
        if (memory) {
            this.memory = memory;
        }
    }

    set(name: string, content: T, options?: Object): Promise<void> {
        this.memory[name] = content;
        return Promise.resolve();
    }

    get(name: string, options?: Object): Promise<T> {
        const p = new Promise<T>((resolve) => {
            resolve(this.memory[name]);
        });
        return p;
    }

    delete(name: string, options?: Object): Promise<void> {
        delete this.memory[name];
        return Promise.resolve();
    }
}