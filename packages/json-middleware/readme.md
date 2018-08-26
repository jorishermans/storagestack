# JSON middleware

The JSON middleware transforms the content to a string so it can be saved and will then parse it to JSON when you do a get for the content.

### Middleware

You will have also an ability to define middleware to transform your storage content to the content you want for your application.

You register a middleware by providing a pattern when the middleware needs to be handled and the middleware implementation.