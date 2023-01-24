export type WindowInfo = {
  id: number | string;
  title: string;
};

declare const screenshot: {
  getActiveWindows(): Promise<WindowInfo[]>;
  captureWindowByTitle(filename: string, title: string): Promise<void>;
  captureWindowById(filename: string, id: number | string): Promise<void>;
  captureScreen(filename: string): Promise<void>;
};

export default screenshot;
