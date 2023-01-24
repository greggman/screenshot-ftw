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
const windows = await screenshot.getWindows();

await screenshot.captureWindowByTitle("foo.png", "some window title");
await screenshot.captureWindowById("foo.png", windows[0].id);
await screenshot.captureScreen("foo.png");
```

`getWindows` returns an array of `{id: number, title: string}`
where id can be passed to `captureWindowById`. This is useful for
capturing a window who's title changes (for example a browser).
Set the browser's window title to a known name, call `getWindows`
and find its `id`. Then pass that `id` for all screenshots.

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

