# Rent-room backend

## Structure

```
rent-room/
├── scripts/
	├── address-in-vietnam/		# Scripts used to generate address in Vietnam
	├── codegen/				# Scripts used to generate TypeScript code from the GraphQL APIs
	├── docs/					# Scripts used to generate documentation markdown
	├── filter-database/		# Scripts used to filter the fields in database
├── src/
	├── common/
	├── config/
	├── firebase/
	├── graphql/
	├── middlewares/
	├── models/
	├── routes/
	├── services/
	├── index.js
├── index.js
├── .env
```

## Development

### 1. Install top-level dependencies

`yarn`

The root directory has a `package.json` which contains build-related dependencies for tasks including:

* Building & deploying the docs 
* Generating TypeScript types from the GraphQL schema

### 2. Set up the server

The server requires MongoDB database to be avaiable. The simplest option is to use MongoDB Atlas, but if you have docker avaiable, you can start a MongoDB database with this command:

`docker run -d -p 27017:27017 --name rent-room-db mongo:latest`

With **rent-room-db** is database's name.

Or you can download MongoDB to run in local here.

### 3. Create .env file

The root directory has a `.env` which contain environment variables for connect to database or some sensitive information.
Default when you pull code to your local, it will not have `.env` file. 

Create `.env` file with this content:

```
PORT=4001
MODE=dev
BASE_URL=http://localhost
ACCESS_TOKEN_SECRET_KEY=123
REFRESH_TOKEN_SECRET_KEY=456
DB_LOCAL_URL=mongodb://localhost:27017/
```

There are six environment variables here: `PORT`, `MODE`, `BASE_URL`, `ACCESS_TOKEN_SECRET_KEY`, `REFRESH_TOKEN_SECRET_KEY`, `DB_LOCAL_URL`.

You can change value of `ACCESS_TOKEN_SECRET_KEY`, `REFRESH_TOKEN_SECRET_KEY` to whatever you want.

`DB_LOCAL_URL` is MongoDB connection's url, you can change its value to connect to your database.

### 4. Run the dev server

`yarn dev`

This command will connect to database and run the server.


# About graphQL api

This is where avaiable api you can test in server. If you want more control please contact [Hieucao]({{ admin.gmail }}) to access Apollo Studio of this project

{{ graph.docs.content }}
