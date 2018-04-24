import { XLSX } from 'xlsx';
import log from 'electron-log';

export function readFromFile(fileName) {
  const wb = XLSX.readFromFile(fileName);
  wb.Sheets.forEach((value) => {
    const json = XLSX.utils.sheet_to_json(value, { header: 1 });
    log.info(json);
  });
}
