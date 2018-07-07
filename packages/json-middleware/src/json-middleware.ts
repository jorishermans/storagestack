import { MiddlewareStack, StorageInfo } from '@storagestack/core';

export class JsonMiddleware implements MiddlewareStack {

    set(storageInfo: StorageInfo, next: () => void) {
        storageInfo.content = JSON.stringify(storageInfo.content);
        next();
    }
    
    get(storageInfo: StorageInfo, next: () => void) {
        storageInfo.content = JSON.parse(storageInfo.content);
        next();
    }
}