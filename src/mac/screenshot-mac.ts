import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { spawn } from '../spawn.js';
import { WindowInfo, WindowId } from '../window-info.js';
import API from '../api.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const activeWindowsCmd = join(__dirname, 'list-active-windows');
const screenshotCmd = 'screencapture';

async function getWindows(): Promise<WindowInfo[]> {
  const {stdout} = await spawn(activeWindowsCmd, ['--open-windows-list']);
  return JSON.parse(stdout);
}

async function captureWindowByTitle(filename: string, title: string): Promise<void> {
  const windows = await getWindows();
  const window = windows.find(window => window.title.includes(title));
  if (!window) {
    throw Error(`no window with title '${title}'`);
  }
  return captureWindowById(filename, window.id);
}

async function captureWindowById(filename: string, windowId: WindowId): Promise<void> {
  await spawn(screenshotCmd, ['-o', '-x', `-l${windowId}`, filename]);
}

async function captureScreen(filename: string): Promise<void> {
  await spawn(screenshotCmd, ['-x', filename]);
}

const api: API = {
  getWindows,
  captureWindowByTitle,
  captureWindowById,
  captureScreen,
};

export default api;
