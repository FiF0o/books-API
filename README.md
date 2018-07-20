# Books-API
<br>
<br>

This is a simple server side App offering a web API as well as a front based a [GraphQL](https://graphql.org/) & [MongoDB](https://docs.mongodb.com/manual/installation/) implementations.
<br>
- GraphQL implementation is available on the `graphql` branch as well as `master`.
- MongoDB implementation available on `mongo` branch.
<br>


The front-end uses ReactJs and Material design css with [Material Components Web](https://material.io/develop/web/docs/getting-started/) library:
- Redux for state management, Sagas for side-effects & Websocket for live updates on the `mongo` branch.
- [PrismaDB](https://www.prisma.io/), Apollo is used on the `graphql` branch to interface with graphQL.

## 1. Pre-requisites
-----------------
You must add your `DATABASE` endpoints for your environments in the `config` directory.
```
./
 __config/
  package.json
 .env
 ...
```
<br><br>
The API is served by default on `PORT:3000`.<br>
The Web app is served by default on `PORT:3001`.
<br>
<br>
<br>

### *1.1 Dependencies*
You must have MongoDB installed on your machine or PrismaDB.
<br>
<br>
### *1.2 Environment*
Env variables are loaded with [dotenv](https://www.npmjs.com/package/dotenv).<br>
Before running the project don't forget to add the following variables in your `.env` file.<br>
```
// MongoDB variables for differents environments...
DEV_DB
PROD_DB


// API endpoints, ports... for MongoDB, GraphQL
API_PORT=

// App env variables...
APP_PORT=

// Prisma DB variables:  App & DB layers, Authentication/Encryption Token
PRISMA_DB_ENDPOINT=
PRISMA_DB_SECRET=
PRISMA_CLUSTER=
PRISMA_BEARER_TOKEN=

```
(_Refer_ to the `env` file for help)
<br>
<br>

### 1.3 MongoDB implementation
_[mongo shell](https://docs.mongodb.com/manual/mongo/) to test & debug._<br>
- Runs on `PORT:3000`
- Routes & endpoints:
  - `/api/books/`
  - `/api/books/:id`
  - `/api/genres/`
  - `/api/genres/:id`
- Mongoose ODM (Schema, Controllers):
  ```
    ./
    __api/
    ____resources/
    ______ <resource>/
    ________ index.js
    ________ <resource>.controller.js
    ________ <resource>.model.js
    ________ <resource>.router.js
    ...
    ______ router.js
    ______ index.js
  ```
<br>
<br>

### 1.4 GraphQL inplementation
[GraphQL](https://www.howtographql.com/), [Prisma](https://www.prisma.io/) ORM.<br>
- Application layer (GraphQL):
  ```
  ./
  __/api/
  ____schema.graphql
  ____index.js
  ```
- Database layer (Prisma & bindings):
  ```
  ./
  __database/
  ____datamodel.graphql
  ____prisma.yml
  ```
<br>

_Additional documentation:_
- _[init prisma service](https://www.prisma.io/docs/tutorials/setup-prisma/demo-server-ouzia3ahqu)._
- _[deploy prisma & generated prisma.graphql](https://www.prisma.io/docs/quickstart/)._
- _[prisma API](https://www.prisma.io/docs/reference/prisma-api/overview-ohm2ouceuj/)._
<br>
<br>
<br>

## 2. Commands
- Running the project: `npm run start`
- Developing: `npm run dev`
- Running the web API: `npm run api`
- Running the web server: `npm run server`
- Bundling the artefacts: `npm run build`
- _(optional)_ mongoDB cluster: `npm run db`
<br>
<br>
<br>

## 3. Next steps
-------------
 - Testing.
 - CI/CD.
 - Styling on the `graphql` branch.
