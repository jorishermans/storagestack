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
});