var assert = require("assert");
var browserify = require("browserify");
var path = require("path");
var require_not_found_parent = require("../../");
var sinon = require("sinon");

suite("Plugin", function () {
  var browserify_opts = {
    basedir: path.resolve(__dirname, path.join("..", "fixture")),
  };

  suite("works without error", function () {
    var browserify_opts = {
      basedir: path.resolve(__dirname, path.join("..", "fixture")),
    };

    test("with entry module", function (done) {
      browserify("./dep", browserify_opts)
      .plugin(require_not_found_parent)
      .bundle(done)
      ;
    });
    // test

    test("with child module", function (done) {
      browserify("./entry", browserify_opts)
      .plugin(require_not_found_parent)
      .bundle(done)
      ;
    });
    // test
  });
  // suite

  suite("works with error", function () {
    var browserify_opts = {
      basedir: path.join(__dirname, "..", "fixture"),
    };
    test("with non-existent entry module", function (done) {
      var entry = "./non-existent";

      browserify(entry, browserify_opts)
      .plugin(require_not_found_parent)
      .bundle(function (err, src) {
        assert(
          err.stack.indexOf(
            path.join(browserify_opts.basedir, entry)
          ) >= 0
        );
        done();
      })
      ;
    });
    // test

    test("with non-existent child module", function (done) {
      var entry = "./entry-error";

      browserify(entry, browserify_opts)
      .plugin(require_not_found_parent)
      .bundle(function (err, src) {
        assert(
          err.stack.indexOf(
            path.join(browserify_opts.basedir, entry)
          ) >= 0
        );
        done();
      })
      ;
    });
    // test
  });
  // suite
});
// suite
