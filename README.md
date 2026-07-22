# OmniHokkien project page

An editorial research note for **OmniHokkien**, iNLP Lab's ongoing work on a
conversational Singapore-Hokkien speech-to-speech system. The page documents
the current method, selected audio samples, training data, early findings,
limitations, and next experiments.

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

## Comparison gallery

`compare.html` presents the same ten inputs across OmniHokkien, GPT Audio,
Qwen3.5-Omni-Plus, Gemini, and GLM-Voice. It is explicitly framed as a
qualitative listening gallery rather than a numerical benchmark.

## Deployment

The repository is configured for GitHub Pages through
`.github/workflows/pages.yml`. Every push to `master` deploys the latest site.
