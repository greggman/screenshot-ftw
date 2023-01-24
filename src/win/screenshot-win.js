import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import spawn from '../spawn.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cmd = join(__dirname, 'screenshot-win.exe');

export async function captureWindowByTitle(screenshotName, title) {
  await spawn(cmd, ['--window-title', title, screenshotName]);
}

export async function captureWindowById(screenshotName, windowId) {
  await spawn(cmd, ['--window-id', windowId, screenshotName]);
}

export async function screenshotScreen(screenshotName, screenId) {
  await spawn(cmd, [screenshotName]);
}
