import * as win from './win/screenshot-win.js';
import * as mac from './win/screenshot-mac.js';
import * as linux from './win/screenshot-linux.js';

function getPlatformAPI() {
  switch (process.platform) {
    case 'win32':
      return win;
    case 'darwin':
      return mac;
    // TODO: support more platforms?
    default:
      return linux;
  }
}

const platformAPI = getPlatformAPI();
export default platformAPI;
