# JSON View - Chrome Extension

![JSON View](./packages/extension/public/icon-128.png)

A minimal Chrome extension for reading raw JSON responses in the browser.

JSON View only activates when the top-level browser document is served as `application/json`.
It replaces the browser’s plain JSON output with a clean, syntax-highlighted view that supports OS light/dark theme, word wrap, file size display, and clickable HTTP/HTTPS links inside JSON strings.

![JSON View screenshot](./screenshot.png)

Try it with a mock JSON endpoint:

https://jsonplaceholder.typicode.com/todos/1

## Architecture

The project is organized as a small monorepo:

- `@jview/extension`: WXT extension shell, content script, popup entrypoint, and JSON rendering bootstrap.
- `@jview/view`: JSON rendering UI, syntax highlighting, link detection, and viewer layout.
- `@jview/popup`: popup settings UI.
- `@jview/storage`: settings storage context and browser storage strategy.
- `@jview/definitions`: shared settings schema and TypeScript types.
- `@jview/tests`: Playwright tests and visual snapshots.

There is no background script or service worker.

## Development

You can run following commands in the root.

```sh
npm run dev
```

## Build

```sh
npm run build
```

# ToDo

* Add knip
