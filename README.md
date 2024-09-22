The comparison of the behavior of different browsers when a page transitions during fetching of a resource from b/f cacheable page and back to the page.

See [#1](https://github.com/mizdra/bfcache-browser-compatibility-test/issues/1).

## Setup

```
npx serve .
open http://localhost:3000
```

## The comparison of the behavior

Comparison steps:

1. Open http://localhost:3000/1-basic (b/f cacheable page)
2. Click `Fetch resource and transit to another page` button
3. Browser back to the previous page

Summary of the behavior:

- Chrome
  - Fetching continues even during the page transition. Fetching is not aborted.
  - If you go back to the previous page, the page will resume after the fetch is complete or from the state where the fetch is in progress.
- Firefox and Safari
  - The fetch is aborted by the page transitions, and the `TypeError` is thrown.
  - If you go back to the previous page, the page will resume from after the `TypeError` is thrown.

### Chrome 129.0.6668.59（Official Build） （arm64） / macOS 15.0

https://github.com/user-attachments/assets/638a2d28-5b2e-4c1c-a79c-4317b7438d6a

### Firefox 130.0.1 (64-bit) / macOS 15.0

https://github.com/user-attachments/assets/bd7ffa39-2f5f-46a9-b33c-a0d48b9b0797

## Safari 18.0 (20619.1.26.31.6) / macOS 15.0

https://github.com/user-attachments/assets/3f560784-3407-4a45-b7a5-822acb20f237
