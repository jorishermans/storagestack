# Search middleware

The Search middleware helps you to build a index around json objects.

### Middleware

It will add content to the index when you call the set method or remove it when you delete the content.

See below how to register the middleware.

```typescript
ss.registerProvider(new MemoryProvider(memory));
const searchMiddleware = new SearchMiddleware();
ss.use('/files/*', searchMiddleware);
await ss.set('/files/text', 'this is just a little bit of text that should be indexed.');
```

Than you can call the search method on the search middleware to perform a search.
```typescript
const results = await searchMiddleware.search('computer science');
```

You can add a basePath if you want to the search middleware, the basePath is where the index files will be stored.
```typescript
const searchMiddleware = new SearchMiddleware('/some-path-to-index-files');
```