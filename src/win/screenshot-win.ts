import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { spawn } from '../spawn.js';
import { WindowInfo, WindowId } from '../window-info.js';
import API from '../api.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const activeWindowsCmd = join(__dirname, 'list-active-windows.exe');
const screenshotCmd = join(__dirname, 'screenshot-win.exe');

async function getWindows(): Promise<WindowInfo[]> {
  const {stdout} = await spawn(activeWindowsCmd, []);
  return JSON.parse(stdout);
}

async function captureWindowByTitle(filename: string, title: string): Promise<void> {
  await spawn(screenshotCmd, ['--window-title', title, filename]);
}

async function captureWindowById(filename: string, windowId: WindowId): Promise<void> {
  await spawn(screenshotCmd, ['--window-id', windowId.toString(), filename]);
}

async function captureScreen(filename: string): Promise<void> {
  await spawn(screenshotCmd, [filename]);
}

const api: API = {
  getWindows,
  captureWindowByTitle,
  captureWindowById,
  captureScreen,
};

export default api;
