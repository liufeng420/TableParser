import ejs from 'ejs';
import log from 'electron-log';
import fs from 'fs';

export function jsonToTable(jsonMap, tempFile) {
  ejs.renderFile(tempFile, jsonMap, (err, str) => {
    log.info(err, str);
    if (!err) {
      fs.writeFile('E:/nodejs/test/test.lua', str);
    }
  });
  return 'ok';
}
