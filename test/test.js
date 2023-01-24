import { screenshot } from '../src/screenshot.js';

async function main() {
  const windows = await screenshot.getWindows();
  console.log(JSON.stringify(windows, null, 2));
  await screenshot.captureWindowById("test.png", windows[0].id);
}

main();