describe('foo', () => {

  let letAssignment = '';
  let letDecleration;
  let multipleLetDeclaration1, multipleLetDeclaration2;
  let multipleLetAssignment1 = 'one', multipleLetAssignment2 = 2;

  var varAssignment = '';
  var varDecleration;
  var multipleVarDeclaration1, multipleVarDeclaration2;
  var multipleVarAssignment1 = 'one', multipleVarAssignment2 = 2;

  const q = 'nope';

  it('should be a fake test', () => {
    expect(true).toEqual(true);
  });

  describe('nestedDescribeOne', function() {

    describe('nestedDescribeTwo', function() {
      let nestedDeclaration = 'nested';
    });

  });

  var endOfBlockDeclaration = 'later';

});
