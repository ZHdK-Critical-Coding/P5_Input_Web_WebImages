# P5.js: Web Images

[English](readme.md)

Lädt eine Webseite, parst ihr HTML und zeigt alle Bilder (`<img>`- und
`<picture>`-Quellen) mit ihren Alt-Texten als Raster von Vorschaubildern an.
Ein Ausgangspunkt, um Bildmaterial von Websites zu sammeln und
weiterzuverarbeiten.

## Installation

Voraussetzungen: Chrome und eine Internetverbindung. Weil die Seite von
einer fremden Domain geladen wird, blockiert der Browser die Anfrage
normalerweise (CORS).

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

## Ausführen

1. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
2. Im Bereich **Run and Debug** die Konfiguration **Launch Chrome (no
   Security)** starten. Sie öffnet `http://127.0.0.1:5500` in einem
   separaten Chrome-Profil mit ausgeschalteter Web-Sicherheit.
3. Eine URL eingeben und auf **Fetch Images** klicken.

Das unsichere Chrome-Fenster nur für diesen Sketch verwenden, nicht zum
normalen Surfen.

## Coding-Hilfe

- **`sketch.js` → `setup()`**: erstellt die Zeichenfläche, ein Eingabefeld
  (Standard `https://www.zhdk.ch`) und den Knopf **Fetch Images**, der
  `fetchData()` mit der eingegebenen URL aufruft.
- **`fetchData()`**: lädt die Seite mit `fetch()` und parst sie mit
  `DOMParser`. Bei jedem `<img>` wird `src` (oder der erste Kandidat aus
  `srcset`) genommen, bei jedem `<picture>` der erste Kandidat der ersten
  `<source>`. Relative Pfade werden mit `new URL(src, url)` absolut gemacht;
  fehlende Alt-Texte werden zu "(no alt text)".
- **`processImages()`**: entfernt das vorherige Ergebnis und erstellt ein
  `div` mit einem Eintrag pro Bild: ein `<img>` und ein Absatz mit dem
  Alt-Text.
- **`style.css`**: `.imageContainer` und `.imageItem` ordnen das Raster an;
  `img` legt die Grösse der Vorschaubilder fest (100 × 100 px). Hier das
  Aussehen anpassen.
- **`.vscode/launch.json`**: die Chrome-Konfiguration mit
  `--disable-web-security`. Den Port anpassen, falls Live Server einen
  anderen verwendet.
