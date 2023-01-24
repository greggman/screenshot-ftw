import { WindowInfo, WindowId } from "./window-info";

export default interface ScreenshotAPI {
  getWindows(): Promise<WindowInfo[]>;
  captureWindowByTitle(filename: string, title: string): Promise<void>;
  captureWindowById(filename: string, windowId: WindowId): Promise<void>;
  captureScreen(filename: string): Promise<void>;
}
