import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { spawn } from '../spawn.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const activeWindowsCmd = join(__dirname, 'list-active-windows');
const screenshotCmd = 'screencapture';

export async function getWindows() {
  const {stdout} = await spawn(activeWindowsCmd, ['--open-windows-list']);
  return JSON.parse(stdout);
}

export async function captureWindowByTitle(screenshotName, title) {
  const windows = await getActiveWindows();
  const window = windows.find(window => window.title.includes(title));
  if (!window) {
    throw Error(`no window with title '${title}'`);
  }
  return captureWindowById(screenshotName, window.id);
}

export async function captureWindowById(screenshotName, windowId) {
  await spawn(screenshotCmd, ['-o', '-x', `-l${windowId}`, screenshotName]);
}

export async function screenshotScreen(screenshotName, screenId) {
  await spawn(screenshotCmd, ['-x', screenshotName]);
}
