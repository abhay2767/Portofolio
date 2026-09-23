# Abhay Dubey portfolio

Static portfolio with a locally bundled Three.js 0.170.0 hero scene.

## Run locally

From this directory:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000.

## Edit

- `index.html`: résumé-based content, project links, contact information.
- `style.css`: responsive layout and visual styling.
- `scene.js`: procedural 3D smartphone and motion controls.
- `app.js`: mobile navigation and copy-email interaction.
- `Abhay_Dubey_Final_Resume.pdf`: downloadable résumé.

Project illustrations are labeled UI concepts, not actual application screenshots.
Three.js is served locally. Google Fonts requires internet access; system fonts are used as fallback.
The scene supports reduced-motion preferences, a pause control, and a static fallback when WebGL is unavailable.
Contact uses email links; there is no contact-form backend to configure.

Deploy this directory to a static hosting service when ready. Local preview is not a public deployment.
