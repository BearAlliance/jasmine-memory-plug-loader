const compiler = require('./compiler');
const fs = require('fs');

describe('Adds afterAll', () => {

  it('should do it', (done) => {
    const expected = fs.readFileSync(__dirname + '/fixtures/foo-spec-expected.js', 'utf-8');

    compiler('foo-spec')
      .then(stats => {
        // console.log(stats.toJson().modules[0].source);
        const output = stats.toJson().modules[0].source;
        // console.log(output);
        expect(output).toEqual(expected);
        done();
      })
      .catch(err => {
        console.log('err', err);
        fail()
      });

  })
});