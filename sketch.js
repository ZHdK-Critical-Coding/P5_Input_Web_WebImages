
function setup() {
  createCanvas(800, 600);
  background(255);
  noLoop()

  const input = createInput('https://www.zhdk.ch')
  input.position(10, 10);
  const button = createButton('Fetch Images');
  button.position(200, 10);
  button.mousePressed(() => {fetchData(input.value())});
}

function fetchData(url) {
  let imagesData = [];
  fetch(url)
    .then(response => response.text())
    .then(html => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, "text/html");

      // 1. Handle all <img> tags
      let imgs = doc.querySelectorAll("img");
      imgs.forEach(img => {
        let src = img.getAttribute("src");

        if (!src) {
          let srcset = img.getAttribute("srcset");
          if (srcset) {
            // take first candidate
            let firstCandidate = srcset.split(",")[0].trim().split(" ")[0];
            src = firstCandidate;
          }
        }

        if (src) {
          let absoluteSrc = new URL(src, url).href;
          imagesData.push({
            src: absoluteSrc,
            alt: img.alt || "(no alt text)"
          });
        }
      });

      // 2. Handle <picture> tags with <source>
      let pictures = doc.querySelectorAll("picture");
      pictures.forEach(pic => {
        let sources = pic.querySelectorAll("source");
        if (sources.length > 0) {
          let source = sources[0]
          let srcset = source.getAttribute("srcset");
          if (srcset) {
            // take first candidate in srcset
            let firstCandidate = srcset.split(",")[0].trim().split(" ")[0];
            if (firstCandidate) {
              let absoluteSrc = new URL(firstCandidate, url).href;

              // try to get alt from <img> fallback inside picture
              let img = pic.querySelector("img");
              let altText = img ? (img.alt || "(no alt text)") : "(no alt text)";

              imagesData.push({
                src: absoluteSrc,
                alt: altText
              });
            }
          }
        }
      });

      processImages(imagesData);
    })
    .catch(err => console.error("Error fetching website:", err));
}

let container

function processImages(imagesData) {
  if (container) {
    container.remove()
  }
  container = createDiv(''); // p5 select()
  container.class('imageContainer')
  for (let i = 0; i < imagesData.length; i++) {
    let item = createDiv(''); // p5 select()
    item.class('imageItem')
    item.parent(container)
    const img = createImg(imagesData[i].src, imagesData[i].alt)
    img.parent(item)
    const alt = createP(imagesData[i].alt)
    alt.parent(item)
  }
}