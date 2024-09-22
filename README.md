The comparison of the behavior of different browsers when a page transitions during fetching of a resource from b/f cacheable page and back to the page.

See [#1](https://github.com/mizdra/bfcache-browser-compatibility-test/issues/1).

## Setup

```
npx serve .
open http://localhost:3000
```

## Summary

Comparison steps:

1. Open http://localhost:3000/1-basic (b/f cacheable page)
2. Click `Fetch resource and transit to another page` button
3. Browser back to the previous page

The behavior of each browser is as follows:

- Chrome
  - Fetching continues even during the page transition. Fetching is not aborted.
  - If you go back to the previous page, the page will resume after the fetch is complete or from the state where the fetch is in progress.
- Firefox and Safari
  - The fetch is aborted by the page transitions, and the `TypeError` is thrown.
  - If you go back to the previous page, the page will resume from after the `TypeError` is thrown.

## Recordings

### Chrome 129.0.6668.59（Official Build） （arm64） / macOS 15.0

https://github.com/user-attachments/assets/638a2d28-5b2e-4c1c-a79c-4317b7438d6a

### Firefox 130.0.1 (64-bit) / macOS 15.0

https://github.com/user-attachments/assets/bd7ffa39-2f5f-46a9-b33c-a0d48b9b0797

## Safari 18.0 (20619.1.26.31.6) / macOS 15.0

https://github.com/user-attachments/assets/3f560784-3407-4a45-b7a5-822acb20f237

## Additional information

- The behavior of Firefox and Safari can sometimes lead to serious problems.
  - Imagine a case where a fetch is being performed while rendering the React component tree, and that fetch is interrupted by a page transition.
  - If the user goes back to the browser, an error screen may be displayed.
  - This is because a `TypeError` is caught in the top-level [`<Suspense>`](https://ja.react.dev/reference/react/Suspense) component of the page, and the entire page switches to the error screen.
- `TypeError` has no stack trace.
  - I don't know if this is a bug or not.
- `TypeError` may be reported to error reporters such as [Sentry](https://sentry.io/welcome/).
  - At @mizdra's company, several Sentry projects have received the error.
  - The characteristics of the error are as follows:
    - The name/message of the error is `TypeError: Load failed` or `TypeError: NetworkError when attempting to fetch resource`. 
    - The stack trace is empty.
    - The page where the error occurred is b/f cacheable.
    - [Breadcrumbs](https://docs.sentry.io/product/issues/issue-details/breadcrumbs/) show that the page was navigated to during fetching.
- An effective workaround for this problem is to retry the fetch.
  - If the error is thrown, catch it with `try-catch`.
  - Then, retry calling `fetch` after a certain period of time.
  - If the error is thrown multiple times, it will throw the error to the upper frame and end the retry.

## References

- [fetch の中断と Back/Forward Cache からの復元で発生する奇妙な現象について - mizdra's blog](https://www.mizdra.net/entry/2023/12/15/012937)
