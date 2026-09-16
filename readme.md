# P5 -> Web Images

A p5.js sketch that fetches a web page, parses its HTML and displays all
images (`<img>` and `<picture>` sources) together with their alt texts.

## How to Use

1. Start Live Server (click **Go Live** in the VS Code status bar).
2. Because the page is fetched cross-origin, the browser blocks the request
   (CORS). Start the debugger configuration **Launch Chrome (no Security)**
   (Run and Debug panel) to open Chrome with web security disabled.
3. Enter a URL and press **Fetch Images**.
