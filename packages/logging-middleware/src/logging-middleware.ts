import { MiddlewareStack, StorageInfo, BasicInfo } from '@storagestack/core';

export class LoggingMiddleware implements MiddlewareStack {

    set(storageInfo: StorageInfo, next: () => void) {
        console.log('SET: ', storageInfo.name, storageInfo);
        next();
    }
    
    get(storageInfo: StorageInfo, next: () => void) {
        console.log('GET: ', storageInfo.name, storageInfo);
        next();
    }

    delete?(basicInfo: BasicInfo, next: () => void) {
       console.log('DELETE: ', basicInfo.name, basicInfo)
    }
}