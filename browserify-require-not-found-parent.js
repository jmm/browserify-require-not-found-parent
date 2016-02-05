/*
When resolving a require() fails with MODULE_NOT_FOUND, report the requiring
file instead of just its directory. See:

https://github.com/substack/node-resolve/pull/64
https://github.com/substack/node-browserify/issues/1083
https://github.com/substack/node-browserify/issues/1117
*/
var path = require("path");

module.exports = browserify_require_not_found_parent;

function browserify_require_not_found_parent (b, opts) {
  // TODO:FIXME flaky as pipeline could've been altered. See:
  // https://github.com/substack/node-browserify/issues/1158
  var mdeps = b.pipeline.get("deps").get(0);

  // TODO:FIXME undocumented
  var original_resolver = mdeps.resolver;

  // Wrap mdeps.resolver to provide a different callback.
  mdeps.resolver = function (id, parent, original_done) {
    // Wrap original callback to intercept and modify error, if any,
    function done (err, pathname, pkg) {
      if (err) {
        err.stack = err.stack.replace(
          "from '" + path.dirname(parent.filename) + "'",
          parent.filename
        );
      }

      original_done(err, pathname, pkg);
    }
    // done

    original_resolver(id, parent, done);
  };
}
// browserify_require_not_found_parent
