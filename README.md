When resolving a `require()` fails with `MODULE_NOT_FOUND` (`Error: Cannot find module 'dep' from 'parent'`), report the requiring
module's pathname instead of just its directory.

Installation:

`browserify-require-not-found-parent` on npm.

Usage:

```js
var browserifyRequireNotFoundParent =
  require("browserify-require-not-found-parent");

browserify()
.plugin(browserifyRequireNotFoundParent)
```

See:

[https://github.com/substack/node-resolve/pull/64](https://github.com/substack/node-resolve/pull/64)

[https://github.com/substack/node-browserify/issues/1083](https://github.com/substack/node-browserify/issues/1083)

[https://github.com/substack/node-browserify/issues/1117](https://github.com/substack/node-browserify/issues/1117)
