import { StorageInfo, BasicInfo } from "./middleware-holder";

export interface MiddlewareStack {
    set(storageInfo: StorageInfo, next: () => void);
    get(storageInfo: StorageInfo, next: () => void);
    delete?(basicInfo: BasicInfo, next: () => void);
}