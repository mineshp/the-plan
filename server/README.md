# How to Run

The server can either connect to a mongodb or a dynamodb database, if running in AWS then only dynamodb is currently supported. To manually set the db type, please set the environment variable

~~~~
DB_TYPE=mongodb

or

DB_TYPE=dynamodb
~~~~

## Running express server locally
~~~~
NODE_ENV=local npm run start:server
~~~~

## Running express server in AWS development
~~~~
NODE_ENV=development npm run start:server
~~~~

## Running express server in AWS production
~~~~
NODE_ENV=local npm run start:server
~~~~

# How to access Express

The server will run on port 3030, locally you can access it via the http://localhost:3030.