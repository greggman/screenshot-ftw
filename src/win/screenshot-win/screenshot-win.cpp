#include <Windows.h>
#include "gdiplus.h"
#include "dwmapi.h"

#include <cstdlib>
#include <iostream>
#include <string>
#include <vector>

#pragma comment(lib, "Gdiplus.lib")
#pragma comment(lib, "dwmapi.lib")

int GetEncoderClsid(const WCHAR* format, CLSID* pClsid)
{
  UINT  numEncoders = 0;
  UINT  size = 0;

  Gdiplus::GetImageEncodersSize(&numEncoders, &size);
  if (size == 0)
    return -1;

  std::vector<char> info(size);
  Gdiplus::ImageCodecInfo* pImageCodecInfo = (Gdiplus::ImageCodecInfo*)(info.data());
  if (pImageCodecInfo == NULL)
    return -1;

  GetImageEncoders(numEncoders, size, pImageCodecInfo);

  for (UINT j = 0; j < numEncoders; ++j)
  {
    if (wcscmp(pImageCodecInfo[j].MimeType, format) == 0)
    {
      *pClsid = pImageCodecInfo[j].Clsid;
      return j;
    }
  }

  return -1;
} 

void screenshot(const RECT& rect, const wchar_t* filename)
{
  int width = rect.right - rect.left;
  int height = rect.bottom - rect.top;

  HDC hScreen = GetDC(HWND_DESKTOP);
  HDC hDc = CreateCompatibleDC(hScreen);
  HBITMAP hBitmap = CreateCompatibleBitmap(hScreen, width, height);
  HGDIOBJ old_obj = SelectObject(hDc, hBitmap);
  BitBlt(hDc, 0, 0, width, height, hScreen, rect.left, rect.top, SRCCOPY);

  Gdiplus::Bitmap bitmap(hBitmap, NULL);
  CLSID clsid;
  GetEncoderClsid(L"image/png", &clsid);

  bitmap.Save(filename, &clsid);

  SelectObject(hDc, old_obj);
  DeleteDC(hDc);
  ReleaseDC(HWND_DESKTOP, hScreen);
  DeleteObject(hBitmap);
}

std::wstring SafeGetArg(int argc, wchar_t** argv, int i) {
  return std::wstring(i < argc ? argv[i] : L"");
}

int PrintHelp()
{
  std::cerr << R"(usage: screenshot-win [options] filename.png

   --window-title <title of window>
   --window-id <id of window>

   If a window title is passed it will search for a window using FindWindow.
   If a window-id (HWND) as base 10 integer is passed it will use that as a window handle
   Otherwise it will take screenshot of the screen
)";

  return EXIT_FAILURE;
}

int wmain(int argc, wchar_t** argv)
{
  std::vector<std::wstring> args;
  std::wstring window_title;
  std::wstring window_id;
  
  for (int i = 1; i < argc; ++i)
  {
    const wchar_t* arg = argv[i];
    if (arg[0] == '-')
    {
      const wchar_t* option = arg + ((arg[1] == '-') ? 2 : 1);
      if (!wcscmp(option, L"h") || !wcscmp(option, L"help"))
      {
        return PrintHelp();
      }
      if (!wcscmp(option, L"window-title"))
      {
        window_title = SafeGetArg(argc, argv, ++i);
      }
      else if (!wcscmp(option, L"window-id"))
      {
        window_id = SafeGetArg(argc, argv, ++i);
      }
      else
      {
        std::wcerr << L"Unknown option: " << arg << "\n";
        return PrintHelp();
      }
    }
    else
    {
      args.push_back(arg);
    }
  }

  if (args.size() < 1)
  {
    std::wcerr << L"no filename specified\n";
    return PrintHelp();
  }

  if (args.size() > 1)
  {
    std::wcerr << L"too many arguments\n";
    return PrintHelp();
  }

  std::wstring filename = args[0];
  HWND hWnd = NULL;

  if (!window_title.empty())
  {
    hWnd = FindWindow(NULL, window_title.c_str());
    if (hWnd == NULL)
    {
      std::wcerr << L"No window with title '" << window_title << "' found\n";
      return EXIT_FAILURE;
    }
  }
  else if (!window_id.empty())
  {
    hWnd = reinterpret_cast<HWND>(std::stoul(window_id));
  }

  SetProcessDPIAware();

  Gdiplus::GdiplusStartupInput gdiplusStartupInput;
  ULONG_PTR gdiplusToken;
  Gdiplus::GdiplusStartup(&gdiplusToken, &gdiplusStartupInput, NULL);

  RECT rect;
  if (hWnd)
  {
    SetActiveWindow(hWnd);
    SetForegroundWindow(hWnd);
    std::wcerr << hWnd << "\n";

    // GetWindowRect(hWnd, &rect);
    DwmGetWindowAttribute(hWnd, DWMWA_EXTENDED_FRAME_BOUNDS, &rect, sizeof(rect));
  }
  else
  {
    GetClientRect(GetDesktopWindow(), &rect);
  }
  screenshot(rect, filename.c_str());

  Gdiplus::GdiplusShutdown(gdiplusToken);

  return EXIT_SUCCESS;
}