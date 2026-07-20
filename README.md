# OmniHokkien project page

An audio-first project page for **OmniHokkien**, iNLP Lab's conversational
Singapore Hokkien speech model.

## Preview locally

The site is dependency-free. Serve the repository with any static file server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Editing demos

Demo metadata lives in the `demos` array near the top of `script.js`. Audio
files are stored in `assets/audio/`. Add or remove an object from that array to
update the demo selector.

## Content source

The expanded positioning and feature notes were contributed in
[`hokkienlm project page.md`](<hokkienlm project page.md>) and adapted for the
live page with the release's documented input and output scope.

## Deployment

The repository is configured for GitHub Pages through
`.github/workflows/pages.yml`. Every push to `master` deploys the latest site.
