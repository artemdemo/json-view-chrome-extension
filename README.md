# JSON view Chrome Extension

Chrome extension built with WXT. It prettifies the top-level browser document
only when the response MIME type is `application/json`.

Mock JSON endpoint:

https://jsonplaceholder.typicode.com/todos/1

## Development

```sh
npm run dev
```

## Build

```sh
npm run build
```

# ToDo

* `JsonViewer` - pass `json` object, since you need to parse it anyways
  * If `json` can't be parsed there there is no reason to replace DOM.
* What about extension icon?
* Tests
* Let's try to use `lit` framework (`lit-html`)
  * https://lit.dev/
  * Smaller than `preact`?
