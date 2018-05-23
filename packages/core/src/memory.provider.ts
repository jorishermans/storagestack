import { Provider } from './provider';

export class MemoryProvider implements Provider {
    
    private memory: { [path: string]: string };

    constructor(memory?: { [path: string]: string }) {
        this.memory = {};
        if (memory) {
            this.memory = memory;
        }
    }

    set(name: string, content: string, options?: Object): Promise<void> {
        this.memory[name] = content;
        return Promise.resolve();
    }

    get(name: string, options?: Object): Promise<string> {
        const p = new Promise<string>((resolve) => {
            resolve(this.memory[name]);
        });
        return p;
    }

    delete(name: string, options?: Object): Promise<void> {
        delete this.memory[name];
        return Promise.resolve();
    }
}