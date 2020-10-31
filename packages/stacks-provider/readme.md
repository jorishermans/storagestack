# Blockstack provider

This is the implementation of a blockstack (@stacks/storage) provider within storage stack.
From version 7.0 we use @stacks/storage.

### Provider

A provider is an abstract definition of a storage mechanism. Every provider can set, get and delete content.

You can register a provider on the application object of storagestack.
```typescript
ss.registerProvider(new BlockstackProvider());
```

Or when you want to use a pattern ...
```typescript
ss.registerProvider(new BlockstackProvider(), '*-index.json');
```

Take a look in the core library to the provider interface.