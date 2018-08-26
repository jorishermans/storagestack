## StorageStack Core

With storagestack you can use middleware to control the flow of storing data into a storage system.

When we see the rise of decentralized applications it is important to build upon a framework to control the content in these distributed systems. This will help to implement common functionality within the space.

This provides you with the application object of storagestack
```typescript
import { ss } from '@storagestack/core';
```

### Provider

A provider is an abstract definition of a storage mechanism. Every provider can set, get and delete content.

You can register a provider on the application object of storagestack.
```typescript
ss.registerProvider(new MemoryProvider());
```

Or when you want to use a pattern ...
```typescript
ss.registerProvider(new MemoryProvider(), '*-index.json');
```

Take a look in the core library to the provider interface.

### Middleware

You will have also an ability to define middleware to transform your storage content to the content you want for your application.

You register a middleware by providing a pattern when the middleware needs to be handled and the middleware implementation.
```typescript
ss.use('*', new UpperMiddleware());
```

When you want to create your own middleware you can just implement the 'MiddlewareStack' interface.

An example of a middleware implementation that has a counter and transforms the content to uppercase when it is been set.
```typescript
class UpperMiddleware implements MiddlewareStack {
    count = 1;
    
    set(storageInfo: StorageInfo, next: () => void) {
        storageInfo.content = storageInfo.content.toUpperCase();
        next();
    }
    
    get(storageInfo: StorageInfo, next: () => void) {
        storageInfo.content = `${this.count} ${storageInfo.origin}`;
        this.count++;
        next();
    }
}
```