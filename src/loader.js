let recast = require('recast');
let types = require('ast-types');
let assert = require("assert");
let n = require("ast-types").namedTypes;
let b = require("ast-types").builders;

module.exports = function(source, map) {
  // console.log(source);

  let ast = recast.parse(source);

  types.visit(ast, {
    visitCallExpression: function (path) {
      const node = path.node;

      if (this.isDescribeExpression(node)) {
        console.log('isDescribe');


        let declaredIds = getDeclaredIds(node);
        console.log(declaredIds);

        let block = recast.parse(createAfterEach(declaredIds));
        node.arguments[1].body.body.push(block.program.body[0]);
      }

      this.traverse(path);
    },

    isDescribeExpression: function (node) {
      return node.type === 'CallExpression' &&
        node.callee.type === 'Identifier' &&
        node.callee.name === 'describe';
    },

    isDescribeIdentifier: function(node) {
     return node.name === 'describe';
    },

    isBlockStatment: function(node) {
      // console.log(node.type);
      return node.type === 'BlockStatement';
    }

  });

  const newSource = recast.print(ast).code;

  console.log(newSource);

  this.callback(null, newSource, map);

  function getDeclaredIds(node) {
    return node.arguments[1].body.body.reduce((acc, line) => {
        if(line.type === 'VariableDeclaration') {
          return [...acc, ...line.declarations.map(declaration => declaration.id.name)];
        }
        return acc;

    }, []);
  }

  function createAfterEach(identifiers) {
    let body = `afterEach(function() {\n`;

    identifiers.forEach(identifier => {
      body = body + (`${identifier} = null;\n`);
    });

    return body + '});';
  }
};
