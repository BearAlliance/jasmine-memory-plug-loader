# DEPRECATED

Jasmine [fixed the memory
leak](https://github.com/jasmine/jasmine/issues/1154) in
v3.0.0+. Please upgrade to a recent version of Jasmine.

# jasmine-memory-plug-loader

A webpack loader that plugs jasmine memory leaks

# Why

[This github issue](https://github.com/jasmine/jasmine/issues/941)
and [this StackOverflow question](https://stackoverflow.com/questions/32998442/angularjs-unit-testing-memory-leaks)
describe the problem well

Example:
```javascript
describe('Test suite', function() {
  var a, b;

  beforeEach(function() {
    // init heavy objects
    a = new Array(10000).join('x');
    b = new Array(10000).join('y');
  });

  // NOTE: often forgotten cleanup
  afterEach(function () {
    a = null;
    b = null;
  });

  it('spec1', function() {
    // spec code..
  });

  // other specs and inner suites ..
});
```

If the needed cleanup is forgotten because jasmine builds up a tree from all registered suits and each suites containes references to his beforeEach, afterEach.. functions which contain references to the describe function closure which holds references to the 'a' and 'b' variables, the large objects that are referenced by that variables won't be GC-ed until Jasmine stops the execution.

If you're working with an extremely large, legacy codebase and you'd rather not refactor it to conform to this best practice, this loader will insert an `afterAll` inside each `describe` that sets everything initialized there to `null`

### Why not `afterEach`?
Good question. Because if you wrote crappy, non-atomic tests that depend on the initialized variable rather than assigning their value in `beforeEach`, setting them to `null` in `afterEach` will break your tests.

If you wrote good tests, congratulations. I'll be adding an option to do this soon.

### Will this clean up all of my memory leaks?
No. Things inserted into the DOM during the test run will remain there if they are not cleaned up.

# Use

for `.js` files

`webpack.config.js`
```javascript
module: {
  rules: [
    {
      test: /spec\.js$/,
      use: 'jasmine-memory-plug-loader'
    }
  ]
}
```

for `.ts` files, you must first use a loader that can handle TypeScript

`webpack.config.js`
```javascript
module: {
  rules: [
    {
      test: /spec\.js$/,
      use: [
        'jasmine-memory-plug-loader',
        'typescript-loader'
        ]
    }
  ]
}
```
