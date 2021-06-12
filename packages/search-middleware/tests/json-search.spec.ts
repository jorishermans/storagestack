import { ss, MemoryProvider } from '@storagestack/core';
import { SearchMiddleware } from '../src/search-middleware';

describe('Search Middleware with json', () => {
    test('should perform a basic search and can retrieve the json documents', async () => {
        let memory = {};
        
        ss.registerProvider(new MemoryProvider(memory));
        const searchMiddleware = new SearchMiddleware();
        ss.use('/files/*', searchMiddleware);
        await ss.set('/files/text', {some: "Cool!", date: new Date(), count: 5, text: 'Help me out.'});
        await ss.set('/files/cool.txt', {some: "Cool!", date: new Date(), count: 5, text: 'Help me out. Or maybe not!'});
        await ss.set('/files/java.txt', {some: "java!", date: new Date(), count: 5, text: 'This is not what I want'});
        await ss.set('/files/oyd.txt', {some: "oyd!", date: new Date(), count: 5, text: 'own your own data, is the future for full privacy.'});
        await ss.set('/files/data-types.txt', 'In computer science and computer programming, a data type or simply type is a classification identifying one of various types of data, such as real, integer or Boolean, that determines the possible values for that type; the operations that can be done on values of that type; the meaning of the data; and the way values of that type can be stored.');

        const results = await searchMiddleware.search('Cool! Help me out.');
        expect(results).toHaveLength(2);
        expect(results[0].name).toBe("/files/text");
    });

});