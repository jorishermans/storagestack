## [0.7.16] - 2020-10-29

- update webnative to the latest 0.29.1 version


## [0.7.15] - 2020-08-16

- update webnative to the latest 0.27.0 version

## [0.7.14] - 2020-08-16

- get the imports of the logging middleware correct
- update setup typescript

## [0.7.13] - 2020-08-16

- get the imports of the search middleware & webnative provider correct
- update setup typescript

## [0.7.12] - 2020-08-15

- update version webnative

## [0.7.11] - 2020-07-26

- use valueOf when returning an object of WebNative

## [0.7.10] - 2020-07-22

- add useOnce, to garanty that a middleware instance of a specific class is been added only once

## [0.7.9] - 2020-07-22

- add findMiddlewareByType to our core ss object
- add hasMiddleware to our core ss object

## [0.7.8] - 2020-07-21

- check if file exist

## [0.7.7] - 2020-07-21

- es module setup for search middleware

## [0.7.6] - 2020-07-21

- check if file exist on webnative provider

## [0.7.5] - 2020-07-21

- add debug option to search middleware
- improve search middleware, add next function on every branch

## [0.7.4] - 2020-07-21

- use proper error handling when something went wrong in search middleware
- add clear method in the core package, to clear providers, middleware, ...
- add logging middleware

## [0.7.3] - 2020-07-17

- use as default pattern matching ** so it supports directories
- fix private & public folders for webnative
- add hasProvider to the core library
- prepare es module build pipeline (first only on webnative provider)

## [0.7.2] - 2020-07-16

- update webnative to version 0.26.0
- test new compile method with webnative provider
- add ipfs as peerDependency instead of dependency

## [0.7.1] - 2020-06-12

- add search middleware to storage stack, a full text search engine supporting text, json objects, ...

## [0.7.0] - 2020-06-08

- add support wnfs, webnative as a provider, update ipfs to the latest version
- update to typescript 4.3.2

## [0.7.0-alpha.0] - 2020-10-31

- upgrade to @stacks packages

## [0.6.5] - 2019-04-27

- revert problems with window

## [0.6.4] - 2019-04-27

- check if you are on node.js or not ...

## [0.6.3] - 2019-04-27

- use blockstack directly instead of userSession for getFile, putFile, deleteFile

## [0.6.3] - 2019-04-27

- make userSession public in blockstack provider

## [0.6.2] - 2019-04-27

- blockstack as a peer dependency

## [0.6.1] - 2019-03-28

- check if content is of type string before parsing it into a JSON Object

## [0.6.0] - 2019-03-07

- remove rxjs from indexer middleware

## [0.5.0] - 2019-12-13

- remove rxjs from indexer middleware

## [0.4.17] - 2019-12-13

- update secure-ls package to the latest version

## [0.4.16] - 2019-12-07

- export HashTableIndex in indexer middleware

## [0.4.15] - 2019-12-07

- improvements on the indexer middleware delete method

## [0.4.14] - 2019-11-29

- add secure property to indexer-middleware

## [0.4.11 & 0.4.12] - 2019-11-25

- added package indexer-middleware

## [0.4.11 & 0.4.12] - 2019-11-24

- make callbacks public again

## [0.4.10] - 2019-11-24

- origin can be of any type in StorageInfo

## [0.4.9] - 2019-11-24

- get some basic logging.

## [0.4.8] - 2019-11-24

- better handling when json is not available.

## [0.4.7] - 2019-11-24

- improvements on retrieving data from userSession

## [0.4.5 - 0.4.6] - 2019-11-24

- remove console.log in json middleware

## [0.4.4] - 2019-11-24

- remove console.log in json middleware

## [0.4.3] - 2019-11-23

- add allowSyntheticDefaultImports in blockstack-provider

## [0.4.2] - 2019-11-23

- remove localforage as dependency

## [0.4.1] - 2019-11-23

- change type of content from string to any in StorageInfo

## [0.4.0] - 2019-11-23

- use correct code with dist

## [0.3.0] - 2019-11-23

- add removeProvider, so you can easily remove a storage provider when needed
- use promises for set & delete instead of callbacks

## [0.2.0] - 2019-11-23

- add secure-ls to localstorage packages
- update typescript versions in all packages
- update implementation of blockstack.js to the latest version, use UserSession.