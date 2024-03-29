const electron = require('electron');
const Hapi = require('hapi');
const Path = require('path');
const open = require('open');
const inert = require('inert');

const installExtension = require('electron-devtools-installer').default;

const { REACT_DEVELOPER_TOOLS } = installExtension;

const {
  app,
  BrowserWindow,
} = electron;

var mainWindow = null;

const port = 1337;

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, ''),
      },
    },
  },
});

server.connection({ port });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-finish-launching', () => {
  server.register(inert, (err) => {
    if (err) {
      throw err;
    }

    server.route({
      method: 'GET',
      path: '/',
      handler(request, reply) {
        reply.file('index.html');
      },
    });

    server.route({
      method: 'GET',
      path: '/game/{route?}',
      handler(request, reply) {
        if (request.params.route && request.params.route === 'exit') {
          app.exit();
        } else {
          reply.file('index.html');
        }
      },
    });

    server.route({
      method: 'GET',
      path: '/assets/{filename}',
      handler(request, reply) {
        reply.file(`assets/${request.params.filename}`);
      },
    });

    server.start((e) => {
      if (e) {
        throw e;
      }

      console.log(`Hapi server running at: ${server.info.uri}`);
    });
  });
});

app.on('ready', () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))
  ;

  mainWindow = new BrowserWindow({
    width: 960,
    height: 768,
    resizable: false,
    fullscreen: false,
  });

  mainWindow.loadURL(`http://localhost:${port}/`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('new-window', (event, url) => {
    event.preventDefault();

    open(url);
  });
});

app.on('will-quit', () => {
  server.stop({ timeout: 60 * 1000 }, () => {
    console.log('Server stopped');
  });
});
