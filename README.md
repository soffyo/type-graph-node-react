# type-graph-node-react
This project aims to help developers with the Node.js apps creation process. It provides a base environment with the essential tools already set, which is structured as following:

+ [Node.js](https://nodejs.org/en/) runtime
+ [Typescript](https://www.typescriptlang.org/) language
+ [Express](https://expressjs.com/) server framework
+ [GraphQL](https://graphql.org/) API
+ [React](https://reactjs.org/) client library

## Server
[express-graphql](https://github.com/graphql/express-graphql) is the HTTP server middleware used.

[TypeGraphQL](https://typegraphql.com/) is the (awesome) framework of choice for writing your APIs and keep your types easily in sync.

## Client

[React Router](https://reactrouter.com/) is used for client-side routing.

[GraphQL Code Generator](https://www.graphql-code-generator.com/) is setup for automatic Types generation based on your schema and operation files. Support for [TypedDocumentNode](https://www.graphql-code-generator.com/plugins/typed-document-node) is included.

[useGraphQL](https://github.com/soffyo/use-graphql-ts) is the react/graphql client used.

## Bundler

[Webpack](https://webpack.js.org/) is used as bundler, featuring [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) setup via `webpack-dev-middleware`.

## Editor

If you are using VSCode, a configuration file is already present for the GraphQL extension.

## How to use

TO DO...