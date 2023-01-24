import ScreenshotAPI from './api.js';
import winScreenshot from './win/screenshot-win.js';
import macScreenshot from './mac/screenshot-mac.js';
import linuxScreenshot from './linux/screenshot-linux.js';

function getPlatformAPI(): ScreenshotAPI {
  switch (process.platform) {
    case 'win32':
      return winScreenshot;
    case 'darwin':
      return macScreenshot;
    // TODO: support more platforms?
    default:
      return linuxScreenshot;
  }
}

export * from './window-info';

const platformAPI = getPlatformAPI();
export default platformAPI;
