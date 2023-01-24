import { spawn } from '../spawn.js';

export async function getWindows() {
  throw new Error('unimplemented');
}

export async function captureWindowByTitle(screenshotName, title) {
  throw new Error('unimplemented');
}

export async function captureWindowById(screenshotName, windowId) {
  throw new Error('unimplemented');
}

export async function screenshotScreen(screenshotName, screenId) {
  await spawn('gnome-screenshot', ['-f', screenshotName]);
}
