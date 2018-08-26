### IPFS provider

This is the implementation for the IPFS provider, so if you want to save files to ipfs you can do that with this package.

### Provider

A provider is an abstract definition of a storage mechanism. Every provider can set, get and delete content.

You can register a provider on the application object of storagestack.
```typescript
ss.registerProvider(new IpfsProvider());
```

Or when you want to use a pattern ...
```typescript
ss.registerProvider(new IpfsProvider(), '*-index.json');
```

Take a look in the core library to the provider interface.