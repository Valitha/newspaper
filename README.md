

## Local testing

You can now double-click `index.html` and open it directly in a browser. The archive data is loaded from `assets/issues.js`, so it does not need `fetch()` and does not require localhost.

The homepage automatically changes between `image1.png`, `image2.png`, and `image3.png` while it is left open.

If you prefer to test it over localhost exactly like a normal website, open a terminal in the folder and run:

```text
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Files that matter

- `index.html` - public archive.
- `assets/site.css` - public-site CSS.
- `assets/archive.js` - renders the archive and rotates the homepage artwork.
- `assets/issues.js` - archive metadata and the single source of truth for the homepage.
- `weekN/index.html` - Discord/Open Graph embed + PDF redirect for an issue.
- `weekN/weekN.pdf` - PDF location for Week 19 onward and all new issues.
- `week1.pdf` ... `week18.pdf` - original historical PDF locations, deliberately preserved.
- `newsletterv3.pdf`, `newsletterv4.pdf`, `newsletterv6.pdf` - surviving newsletters.

## Compatibility rules

1. Do not rename or remove `/weekN/` routes that have already been posted in Discord.
2. Do not change the Open Graph/Twitter structure of existing issue pages unless you deliberately want to alter their Discord embed.

Edit the matching record in `assets/issues.js`.

Edit `og:description`, `twitter:description`, `og:image`, and `twitter:image` in `weekN/index.html`. Keep the embed structure intact.

Delete its `weekN/` folder and remove its record from `assets/issues.js`. For Weeks 1-18, the root `weekN.pdf` can be kept if you want old direct PDF links to continue working.


## Optional TFR joke mode

A tiny `TFR` button now sits in the bottom-right corner of the homepage. The public site still starts in the original Roundivyan Times style every time.

When enabled, the joke mode:

- applies the TFR dark/purple palette without changing the page layout;
- uses VCR OSD Mono for headings and Electrolize for ordinary text;
- enables the custom TFR cursor and pointer;
- enables the supplied TFR-style click sounds;
- plays `Crossing The Styx` while the mode is enabled;
- swaps the normal `image1.png`, `image2.png`, and `image3.png` artwork cycle to `image1-tfr.png`, `image2-tfr.png`, and `image3-tfr.png`.

The issue/archive data model is unchanged. Adding a new newspaper to `assets/issues.js` works exactly as before, including its existing `image: 1`, `2`, or `3` setting. Joke mode automatically maps that number to the matching TFR artwork without requiring any new per-issue field.

The mode does not modify issue redirect pages, PDF URLs, newsletters, Open Graph metadata, or existing posted routes.


## TFR joke mode v2

- Swaps the normal orange masthead to `assets/tfr/roundivyan-logo-tfr.png` only while TFR mode is on.
- Every click in TFR mode plays `click_province_01.wav`; typing itself remains silent.
- The latest issue headline and Archive heading use VCR OSD Mono in TFR mode; ordinary text remains Electrolize.
- The normal site layout has also been cleaned up: the divider below the latest-issue block and the divider above Newsletters were removed, and the following content was pulled upward.
- Archive data, issue routing, PDFs, newsletter routes, and the image-number system are unchanged.

### V3 font correction
TFR mode now loads the public `VCR OSD Mono` webfont stylesheet directly and targets the actual latest-issue headline (`[data-latest-text]`) plus Archive heading, avoiding the generic monospace fallback seen in V2.
