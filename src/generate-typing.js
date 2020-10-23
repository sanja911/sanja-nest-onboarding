'use strict';
exports.__esModule = true;
var graphql_1 = require('@nestjs/graphql');
var path_1 = require('path');
var definition = new graphql_1.GraphQLDefinitionsFactory();
definition.generate({
  typePaths: ['./src/**/*.graphql'],
  path: path_1.join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  watch: true,
});
