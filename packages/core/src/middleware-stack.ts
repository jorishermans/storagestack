import { StorageInfo, BasicInfo } from "./middleware-holder";

export interface MiddlewareStack {
    set(storageInfo: StorageInfo, next: () => void): any;
    get(storageInfo: StorageInfo, next: () => void): any;
    delete?(basicInfo: BasicInfo, next: () => void): any;
}