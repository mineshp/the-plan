# Morpheus

React application to manage lists

## morpheus-server
Express api that communicates with mongodb database.

### Run server locally
`npm run start:server`

## morpheus-client
React app

### Run client locally
`npm run start:client`

## Database

### Backups

Backups - Occur 2 times a day and are stored in S3

Dumps happen via cron on the server

### Creating manual dumps
```
bash scripts/mongodb_backup.sh
```

### Restoring database dumps
```
bash scripts/mongodb_restore.sh latest
```

## Tests
Jest tests
`npm run test`

## Deploy App
npm run deploy-minor
build-morpheus <build-number>
deploy-morpheus <build-number>