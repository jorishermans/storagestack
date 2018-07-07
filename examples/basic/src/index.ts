import { ss, MemoryProvider } from '@storagestack/core';
import { JsonMiddleware } from '@storagestack/json-middleware';

ss.registerProvider(new MemoryProvider());

ss.use('*', new JsonMiddleware());
ss.set('cool', 'asset');