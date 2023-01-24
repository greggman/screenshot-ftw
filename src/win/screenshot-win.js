import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { spawn } from '../spawn.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const activeWindowsCmd = join(__dirname, 'list-active-windows.exe');
const screenshotCmd = join(__dirname, 'screenshot-win.exe');

export async function getWindows() {
  const {stdout} = await spawn(activeWindowsCmd, []);
  return JSON.parse(stdout);
}

export async function captureWindowByTitle(screenshotName, title) {
  await spawn(screenshotCmd, ['--window-title', title, screenshotName]);
}

export async function captureWindowById(screenshotName, windowId) {
  await spawn(screenshotCmd, ['--window-id', windowId, screenshotName]);
}

export async function screenshotScreen(screenshotName, screenId) {
  await spawn(screenshotCmd, [screenshotName]);
}
