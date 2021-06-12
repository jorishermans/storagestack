import { ss, MemoryProvider } from '@storagestack/core';
import { SearchMiddleware } from '../src/search-middleware';

describe('Search Middleware', () => {
    test('should perform a basic search and can retrieve the documents that are requested', async () => {
        let memory = {};
        
        console.log('start test');
        ss.registerProvider(new MemoryProvider(memory));
        const searchMiddleware = new SearchMiddleware();
        ss.use('*', searchMiddleware);
        console.log('start 1');
        await ss.set('text', 'this is just a little bit of text that should be indexed.');
        console.log('start 2');
        await ss.set('cool.txt', 'what can we do about this, just look a bit cool right');
        console.log('start 3');
        await ss.set('java.txt', 'is not script the cooler part of this?');
        console.log('start 4');
        await ss.set('oyd.txt', 'own your own data with this tool, it is called oyd');
        console.log('start 5');
        await ss.set('data-types.txt', 'In computer science and computer programming, a data type or simply type is a classification identifying one of various types of data, such as real, integer or Boolean, that determines the possible values for that type; the operations that can be done on values of that type; the meaning of the data; and the way values of that type can be stored.');
        console.log('start 6');

        const results = await searchMiddleware.search('computer science');
        expect(results).toHaveLength(1);
        expect(results[0].name).toBe("data-types.txt");
    });
});