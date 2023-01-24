# screenshot-ftw

An attempt to take a window screenshot across OSes.

Why? I couldn't find one that didn't have too many dependencies
and most only take the full screen.

## usage

```
npm install --save screenshot-ftw
```

```
import * as screenshot from 'screenshot-ftw';

...
await screenshot.captureWindowByTitle("foo.png", "some window title");
await screenshot.captureWindowById("foo.png", "some window id");
await screenshot.captureScreen("foo.png");
```

Note: at the moment only .PNG format is supported

## To Do:

Generate 16bit screenshots.

## Notes:

### Linux is problematic

At the moment it uses `gnome-screencapture` and only handle's full screen captures.
It would be nice if it could check for various methods (imagemagick) etc... and also
handle windows.

## License:

MIT

Also see `src/mac/list-active-windows.LICENSE`

