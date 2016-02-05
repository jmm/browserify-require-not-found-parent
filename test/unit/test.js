var assert = require("assert");
var path = require("path");
var require_not_found_parent = require("../../");
var sinon = require("sinon");

// Stub
function browserify () {
  if (!(this instanceof browserify)) return new browserify;
  var mdeps = {
    resolver: sinon.stub(),
  };

  var deps = {
    get: sinon.stub().returns(mdeps),
  };

  this.pipeline = {
    get: sinon.stub().returns(deps),
  };

  this.__test = {
    original_resolver: mdeps.resolver,
  };
}

suite("Plugin", function () {
  var b;
  var mdeps;
  var resolveDone;
  var resolver;

  setup(function () {
    b = browserify();
    mdeps = b.pipeline.get("mdeps").get(0);
    resolveDone = sinon.spy();
    resolver = b.__test.original_resolver;
  });

  test("works without error", function (done) {
    require_not_found_parent(b);

    mdeps.resolver("x", {}, resolveDone);
    resolver.yield(null, resolver.args[0][0]);

    assert(resolver.callCount === 1);
    assert(resolveDone.callCount === 1);
    done();
  });

  test("works with error", function (done) {
    var paths = {
      dirname: "/somedir",
      basename: "somefile.js",
    };
    paths.pathname = paths.dirname + "/" + paths.basename;

    require_not_found_parent(b);

    mdeps.resolver("x", {filename: paths.pathname}, resolveDone);
    resolver.yield(Error(paths.pathname));

    assert(resolver.callCount === 1);
    assert(resolveDone.callCount === 1);
    assert(resolveDone.args[0][0].stack.indexOf(paths.pathname) >= 0);
    done();
  });
});
