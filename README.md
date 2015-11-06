# karma-websocket-server
> Makes it easy to globally start a [websocket-node](https://github.com/theturtle32/WebSocket-Node) server for karma unit tests.

## Installation
```bash
npm install karma-websocket-server --save-dev
```

## Usage
```javascript
// karma.conf.js
module.exports = function(config) {
  // ... snip
  frameworks: [ 'websocket-server' ],
  websocketServer: {
    port: 8889,
    beforeStart: (server) => {
      server.on('request', (req) => {
        console.log(new Date() + ' new websocket request...');
      });
    },
    afterStart: (server) => {
      console.log('Server now listening!');
    }
  }
});
```

-----

## The configuration object
After the framework is added to the karma configuration, you can control its behaviour with the ```websocketServer``` configuration object. The object holds three seperate items:

#### port (Number):
The port the server will run on. Defaults to 8889 if not provided.

#### beforeStart (Function):
This callback is invoked directly before the http server starts to listen.
It takes the created websocket server instance as parameter.
Use this callback to add listeners (like request) to the configuration.

#### afterStart (Function):
This callback is invoked after the http server has started.
It takes the created websocket server instance as parameter.

-----

## Special thanks
Special thanks go to [Tadas Subonis](https://github.com/tasubo) for creating [karma-express-http-server](https://github.com/tasubo/karma-express-http-server) where I borrowed some of the code.

## Licence
karma-websocket-server is available under MIT-License and can therefore be used in any project free of charge.
