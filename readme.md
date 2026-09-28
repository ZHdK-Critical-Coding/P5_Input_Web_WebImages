# P5.js: Web Images

[Deutsch](README_DE.md)

Fetches a web page, parses its HTML and shows all images (`<img>` and
`<picture>` sources) together with their alt texts as a grid of thumbnails.
A starting point for scraping and remixing visual material from websites.

## Installation

Requirements: Chrome and an internet connection. Because the page is
fetched cross-origin, the browser normally blocks the request (CORS).

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not used).

## How to Run

1. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
2. In the **Run and Debug** panel, start the configuration **Launch Chrome
   (no Security)**. It opens `http://127.0.0.1:5500` in a separate Chrome
   profile with web security disabled.
3. Enter a URL and click **Fetch Images**.

Only use the insecure Chrome window for this sketch, not for normal browsing.

## Coding Help

- **`sketch.js` → `setup()`**: creates the canvas, an input field
  (default `https://www.zhdk.ch`) and the **Fetch Images** button, which
  calls `fetchData()` with the entered URL.
- **`fetchData()`**: loads the page with `fetch()` and parses it with
  `DOMParser`. For every `<img>` it takes `src` (or the first `srcset`
  candidate), for every `<picture>` the first candidate of the first
  `<source>`. Relative paths are made absolute with `new URL(src, url)`;
  alt texts default to "(no alt text)".
- **`processImages()`**: removes the previous result and creates a `div`
  with one item per image: an `<img>` and a paragraph with the alt text.
- **`style.css`**: `.imageContainer` and `.imageItem` lay out the grid;
  `img` sets the thumbnail size (100 × 100 px). Change the look here.
- **`.vscode/launch.json`**: the Chrome configuration with
  `--disable-web-security`. Adjust the port if Live Server uses another one.
