import { spawn } from '../spawn.js';
import { WindowInfo, WindowId } from '../window-info.js';
import API from '../api.js';

async function getWindows(): Promise<WindowInfo[]> {
  throw new Error('unimplemented');
}

async function captureWindowByTitle(filename: string, title: string): Promise<void> {
  throw new Error('unimplemented');
}

async function captureWindowById(filename: string, windowId: WindowId): Promise<void> {
  throw new Error('unimplemented');
}

async function captureScreen(filename: string): Promise<void> {
  await spawn('gnome-screenshot', ['-f', filename]);
}

const api: API = {
  getWindows,
  captureWindowByTitle,
  captureWindowById,
  captureScreen,
};

export default api;
