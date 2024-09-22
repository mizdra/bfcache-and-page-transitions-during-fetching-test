The comparison of the behavior of different browsers when a page transitions during fetching of a resource from b/f cacheable page and back to the page.

See [#1](https://github.com/mizdra/bfcache-browser-compatibility-test/issues/1).

## Setup

```bash
node server.mjs
open http://localhost:3000/1-fetch.html
open http://localhost:3000/2-video.html
```

## Comparison Result

### Environment

- macOS 14.6.1（23G93）
- Chrome: 129.0.6668.59（Official Build） （arm64）
- Safari: 17.6 (19618.3.11.11.5)
- Firefox: 130.0.1 (64-bit)

### 1-fetch.html



### Chrome (`129.0.6668.59（Official Build） （arm64）`)

## Browser Comparison: 2-video.html

## Credits

- `flower.webm`
  - Copy from https://github.com/mdn/interactive-examples/blob/1c31eedaac0e6a69759e4fb4fffb3fb853e2df0b/live-examples/media/cc0-videos/flower.webm
  - License: [CC0](https://github.com/mdn/interactive-examples/blob/1c31eedaac0e6a69759e4fb4fffb3fb853e2df0b/LICENSE)
