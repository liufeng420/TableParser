import { app, BrowserWindow } from 'electron';
import is from 'electron-is';
import { join } from 'path';
import log from 'electron-log';
import * as application from './services/application';
import * as window from './services/window';
import * as menu from './services/menu';
import * as config from './configs/config';
import * as excel2json from './services/excel2json';
import * as json2table from './services/json2table';

log.transports.file.level = 'info';
// // Same as for console transport
// log.transports.file.level = 'warn';
// log.transports.file.format = '{h}:{i}:{s}:{ms} {text}';

// // Set approximate maximum log size in bytes. When it exceeds,
// // the archived log will be saved as the log.old.log file
// log.transports.file.maxSize = 5 * 1024 * 1024;

// // Write to this file, must be set before first logging
// log.transports.file.file = join(__dirname, '/log.txt');

// // fs.createWriteStream options, must be set before first logging
// // you can find more information at
// // https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
// log.transports.file.streamConfig = { flags: 'w+' };

// // set existed file stream
// log.transports.file.stream = fs.createWriteStream('log.txt');
// log.transports.file.appName = 'test';

log.info('(main/index) >>>>>>>>>>>>>>>>>>');
log.info('(main/index) app start');
log.info(`(main/index) log file at ${log.findLogPath()}`);

if (is.dev()) {
  require('electron-debug')(); // eslint-disable-line global-require
}

app.on('ready', () => {
  log.info('(main/index) app ready');
  application.init();
  menu.init();

  // 加载 devtools extension
  if (is.dev()) {
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/redux-devtools/2.11.1_0'),
    );
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/react-developer-tools/0.15.4_0'),
    );
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window.getCount() === 0) {
    application.init();
  }
});

app.on('quit', () => {
  log.info('(main/index) app quit');
  log.info('(main/index) <<<<<<<<<<<<<<<<<<<');
});

// Register to global, so renderer can access these with remote.getGlobal
global.services = {
  application,
  window,
  excel2json,
  json2table,
};
global.configs = {
  config,
};
