# SS1 Pathways

A free, independent guide for Nigerian students moving from JSS3 to SS1. Students can compare three pathways, answer six activity preference questions and open a classroom worksheet. The reflection uses simple counts and supports a conversation about interests and available subjects.

## Run locally

From this directory, run `python -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000/`. The site uses plain HTML, CSS and JavaScript.

## Hosting

GitHub Pages publishes `/` from `main`. The `.nojekyll` file tells Pages to serve the static files directly. A public GitHub repository can use GitHub Pages under GitHub Free. The site uses the default GitHub Pages URL.

## Update content

- Edit the pathway descriptions and sources in `index.html`.
- When editing the reflection prompts, update `reflection.js` and the matching questions in `worksheet.html` together.
- Increment `cacheName` in `sw.js` on each release to refresh the offline assets. The offline cache becomes available after the first successful load in a compatible browser. Close open site tabs and revisit to activate an updated cache.

The browser holds reflection answers in page memory and clears them on reload. The service worker caches only the site files. The application has no sign-up, analytics or server endpoint for student data.

Curriculum examples are drawn from the [NERDC senior secondary curriculum](https://www.nerdc.gov.ng/content_manager/new_senior_curriculum_home.html) and [NERDC subject offering](https://nerdc.gov.ng/content_manager/Press%20Release%20On%20New%20FG%20Curriculum.pdf). Schools should confirm locally available combinations.
