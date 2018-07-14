import { ss } from '@storagestack/core';
import { JsonMiddleware } from '@storagestack/json-middleware';
import { LocalStorageProvider } from '@storagestack/localstorage-provider';

ss.registerProvider(new LocalStorageProvider());

ss.use('*', new JsonMiddleware());


document.getElementById("save")!.addEventListener("click", function ()
{
    var value = (<HTMLInputElement>document.getElementById("textArea")!).value;
    var obj = { value: value, createdBy: new Date()};
    ss.set('text', obj);
    console.log("save value", value);
    ss.get('text', (storageInfo) => console.log(storageInfo));
} , false);