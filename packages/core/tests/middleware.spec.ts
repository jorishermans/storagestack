import { ss } from '../src';
import { MemoryProvider } from '../src/memory.provider'
import { MiddlewareStack } from '../src/middleware-stack';
import { StorageInfo } from '../src/middleware-holder';

class UpperMiddleware implements MiddlewareStack {
    count = 1;
    
    set(storageInfo: StorageInfo, next: () => void) {
        storageInfo.content = storageInfo.content.toUpperCase();
        next();
    }
    
    get(storageInfo: StorageInfo, next: () => void) {
        storageInfo.content = `${this.count} ${storageInfo.origin}`;
        this.count++;
        next();
    }
}

class AddMiddleware implements MiddlewareStack {

    constructor(private suffix) {}

    set(storageInfo: StorageInfo, next: () => void) {
        storageInfo.content = storageInfo.content + this.suffix;
        next();
    }
    
    get(storageInfo: StorageInfo, next: () => void) {
        next();
    }
}

describe('Middleware', () => {
    test('storage stack test out set functionality', () => {
        let memory = {};
        ss.registerProvider(new MemoryProvider(memory));
        ss.use('*', new UpperMiddleware());
        ss.set('cool', 'asset');

        expect(memory['cool']).toBe('ASSET');
    });

    test('storage stack test out get functionality', () => {
        // expect.assertions(2);
        let memory = {};
        ss.registerProvider(new MemoryProvider(memory));
        ss.use('*', new UpperMiddleware());
        ss.set('cool', 'asset');
        ss.get('cool', (storageInfo: StorageInfo) => {
            expect(storageInfo.content).toEqual('1 ASSET');
        });
        ss.get('cool', (storageInfo: StorageInfo) => {
            expect(storageInfo.content).toEqual('2 ASSET');
        });
    })

    test('storage stack test out 2 middlewares', async () => {
        // expect.assertions(2);
        let memory = {};
        ss.registerProvider(new MemoryProvider(memory));
        ss.use('*', new UpperMiddleware());
        ss.use('*', new AddMiddleware(' A'));
        ss.set('cool', 'asset').then(_ => console.log('cool'));
        const storageInfo: StorageInfo = await ss.get('cool');
        expect(storageInfo.content).toEqual('1 ASSET A');
    })
});