#include <Windows.h>
#include <fcntl.h>
#include <io.h>

#include <cstdlib>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

bool first = true;

std::wstring escape(WCHAR* windowTitle)
{
  std::wstring orig(windowTitle);
  std::wostringstream escaped;
  for (WCHAR c : orig)
  {
    if (c == '\\')
    {
      escaped.put('\\');
      escaped.put('\\');
    }
    else if (c == '\n')
    {
      escaped.put('\\');
      escaped.put('n');
    }
    else if (c == '\t')
    {
      escaped.put('\\');
      escaped.put('n');
    }
    else if (c == '"')
    {
      escaped.put('\\');
      escaped.put('"');
    }
    else
    {
      escaped.put(c);
    }
  }
  return escaped.str();
}

bool BadTitle(WCHAR* windowTitle)
{
  return false;
}

BOOL CALLBACK callback(HWND hwnd, LPARAM lParam) {
  const DWORD TITLE_SIZE = 4096;
  WCHAR windowTitle[TITLE_SIZE];

  GetWindowTextW(hwnd, windowTitle, TITLE_SIZE);
  int length = ::GetWindowTextLength(hwnd);

  if (!IsWindowVisible(hwnd) || length == 0 || !wcscmp(windowTitle, L"Program Manager") || BadTitle(windowTitle)) {
    return TRUE;
  }

  if (!first) {
    std::wcout << L",\n";
  }
  first = false;

  std::wcout << L"{\"id\":" << std::to_wstring(int64_t(hwnd)) << L",\"title\":\"" << escape(windowTitle) << L"\"}";
  return TRUE;
}

int wmain(int argc, wchar_t** argv)
{
  SetProcessDPIAware();

  std::wcout.sync_with_stdio(false);
  std::wcout.imbue(std::locale("en_US.utf8"));
  //_setmode(_fileno(stdout), _O_U16TEXT);
  //SetConsoleOutputCP(65001);

  std::wcout << L"[";
  EnumWindows(callback, NULL);
  std::wcout << L"]";

  return EXIT_SUCCESS;
}