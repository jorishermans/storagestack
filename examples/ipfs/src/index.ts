import { ss } from '@storagestack/core';
import { JsonMiddleware } from '@storagestack/json-middleware';
import { IpfsProvider } from '@storagestack/ipfs-provider';
import * as IPFS from 'ipfs';

const node = new IPFS({ repo: String(Math.random() + Date.now()) });

node.once('ready', () => {
    console.log('IPFS node is ready')
    ss.registerProvider(new IpfsProvider(node));
  })

ss.use('*', new JsonMiddleware());


document.getElementById("save")!.addEventListener("click", function ()
{
    var value = (<HTMLInputElement>document.getElementById("textArea")!).value;
    var obj = { value: value, createdBy: new Date()};
    ss.set('text', obj);
    console.log("save value", value);
    ss.get('text', (storageInfo) => console.log(storageInfo));
} , false);