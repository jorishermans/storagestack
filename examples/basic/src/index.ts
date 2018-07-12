import { ss } from '@storagestack/core';
import { JsonMiddleware } from '@storagestack/json-middleware';
import { LocalStorageProvider } from '@storagestack/localstorage-provider';

ss.registerProvider(new LocalStorageProvider());

ss.use('*', new JsonMiddleware());
ss.set('cool', 'asset');