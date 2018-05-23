import { ss } from '../src';
import { MemoryProvider } from '../src/memory.provider'

describe('Providers', () => {
    test('storage stack test out memory provider set', () => {
        let memory = {};
        ss.registerProvider(new MemoryProvider(memory));
        ss.set('cool', 'asset');

        expect(memory['cool']).toBe('asset');
    });

    test('storage stack test out memory provider delete', () => {
        let memory = {};
        ss.registerProvider(new MemoryProvider(memory));
        ss.set('cool', 'asset');
        ss.delete('cool');
        expect(memory['cool']).toBe(undefined);
    });
});