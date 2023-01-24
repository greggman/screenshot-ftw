import * as win from './win/screenshot-win.js';
import * as mac from './mac/screenshot-mac.js';
import * as linux from './linux/screenshot-linux.js';

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
