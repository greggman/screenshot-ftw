import screenshot from '../src/screenshot.js';

console.log(screenshot, Object.keys(screenshot));

async function main() {
  const windows = await screenshot.getWindows();
  console.log(JSON.stringify(windows, null, 2));
  await screenshot.captureWindowById("test.png", windows[0].id);
}

main();