# `@storagestack/indexer-middleware`

Create a private index on top of your data.

## Usage

```
const indexerMiddleware = require('@storagestack/indexer-middleware');

const nameToId = (name: string) => {
    return name;
};
const transformation = (name: string, t: Blog) => {
    const transformed = {lastUpdated: new Date(),
            favorite: false,
            title: t.title,
            path: name};
            return transformed;
};
this.indexerMiddleware = new IndexerMiddleware(transformation, nameToId, 'blog-index.json');

ss.use('blog-*', this.indexerMiddleware);
```
