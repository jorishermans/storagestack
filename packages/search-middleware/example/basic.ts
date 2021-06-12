import { ss, MemoryProvider } from '@storagestack/core';
import { SearchMiddleware } from '../src/search-middleware';

const example = async () => {
    let memory = {};
    const searchMiddleware = new SearchMiddleware();
    ss.registerProvider(new MemoryProvider(memory));
    ss.use('*', searchMiddleware);
    await ss.set('text', 'this is just a little bit of text that should be indexed.');
    await ss.set('cool.txt', 'what can we do about this, just look a bit cool right');
    await ss.set('java.txt', 'is not script the cooler part of this?');
    await ss.set('oyd.txt', 'own your own data with this tool, it is called oyd');
    await ss.set('data-types.txt', 'In computer science and computer programming, a data type or simply type is a classification identifying one of various types of data, such as real, integer or Boolean, that determines the possible values for that type; the operations that can be done on values of that type; the meaning of the data; and the way values of that type can be stored.');

    const results = await searchMiddleware.search('computer science');
    return results;
}
example().then( x => console.log(x) );
