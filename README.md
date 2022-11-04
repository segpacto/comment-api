# comment-api
Comment Api implementing Graphs on MongoDB

## Description
Implements the creation of comments tree using REST API documented with OpenApi.
The graph tree is storage in MongoDb using the child strategy.
It uses the package `mongoose-autopopulate` for population of relationships in deep since mongoDB doesnt allow recursive properties population.

`More info`:
- [Trees in MongoDB](https://www.mongodb.com/docs/manual/applications/data-models-tree-structures/)
- [Using Graphs in MongoDB](https://www.mongodb.com/databases/mongodb-graph-database)

## Usage
- `npm run dev` to run the dev server
- Browse `http://localhost:3000/api-docs` to see the documentation and basic usage of the API.

`TODO:`
- Implement tests