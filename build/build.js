import fs from 'fs';
import path from 'path';

const files = [
  { filename: 'src/mac/list-active-windows', mode: fs.constants.S_IXUSR },
  { filename: 'src/mac/list-active-windows.LICENSE', },
  { filename: 'src/win/list-active-windows.exe', },
  { filename: 'src/win/screenshot-win.exe', },
];
for (const { filename: srcFilename, mode } of files) {
  const dstFilename = path.join('dist', path.basename(srcFilename));
  fs.copyFileSync(srcFilename, dstFilename);
  if (mode) {
    const stat = fs.statSync(dstFilename);
    fs.chmodSync(dstFilename, stat.mode | mode);
  }
}