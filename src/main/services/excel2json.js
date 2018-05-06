import * as xlsx from 'xlsx';
import log from 'electron-log';

export function readFromFile(fileName) {
  const wb = xlsx.readFile(fileName);
  const map = {};
  map.SheetNames = [];
  for (const [name, sheet] of Object.entries(wb.Sheets)) {
    map.SheetNames.push(name);
    map[name] = parseOneSheet(sheet);
    log.info(`${name}=${JSON.stringify(map[name])}`);
  }
  return map;
}

function parseOneSheet(ws) {
  const range = xlsx.utils.decode_range(ws['!ref']);
  // 去掉第一行的中文字段名
  // 按照第二行,如果有字段名,则导出对应的json
  if (range.e.r < 1) {
    return undefined;
  }
  const colNames = [];
  // 按照第二行,如果有字段名,则导出对应的json
  for (let i = 0; i <= range.e.c; i += 1) {
    const address = xlsx.utils.encode_cell({ c: i, r: 1 });
    const value = ws[address];
    if (value === undefined) {
      colNames.push(undefined);
    } else {
      colNames.push(value.w);
    }
  }
  // 从第三行开始,根据第二行的名称,生成对应的json数组
  const json = [];
  for (let i = 2; i <= range.e.r; i += 1) {
    let emptyLine = true;
    const one = {};
    for (let j = 0; j <= range.e.c; j += 1) {
      const address = xlsx.utils.encode_cell({ c: j, r: i });
      const key = colNames[j];
      const value = ws[address];
      if (key !== undefined) {
        if (value === undefined) {
          one[key] = undefined;
        } else {
          emptyLine = false;
          one[key] = value.w;
        }
      }
    }
    if (!emptyLine) {
      json.push(one);
    }
  }
  return json;
}
