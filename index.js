'use strict';

const WebsocketServer = require('websocket').server;
const http = require('http');

var createWebSocketServer = function(args, config, logger) {

  const log = logger.create('websocket.server');

  log.info('Starting websocket server...');

  let port = typeof config.websocketServer.port !== 'undefined' ? config.websocketServer.port : 8889;

  let httpServer = http.createServer((req, res) => {
    res.writeHead(404);
    res.end();
  });

  let server = new WebsocketServer({
    httpServer: httpServer
  });

  // Add possibility to set custom events for users before server starts
  if(config.websocketServer.beforeStart) {
    config.websocketServer.beforeStart(server);
  }

  httpServer.listen(port, () => {

    // Add possibility to do something after server has started
    if(config.websocketServer.afterStart) {
      config.websocketServer.afterStart(server);
    }

    log.info(`websocket server started on port ${port}`);
  });
};

module.exports = {
  'framework:websocket-server': ['factory', createWebSocketServer]
};
