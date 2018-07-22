import { MiddlewareStack, StorageInfo } from '@storagestack/core';

export class JsonMiddleware implements MiddlewareStack {

    set(storageInfo: StorageInfo, next: () => void) {
        console.log('stringify the content', storageInfo, storageInfo.content);
        storageInfo.content = JSON.stringify(storageInfo.content);
        next();
    }
    
    get(storageInfo: StorageInfo, next: () => void) {
        console.log(storageInfo.content);
        storageInfo.content = JSON.parse(storageInfo.content);
        next();
    }
}