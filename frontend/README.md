# Strategy Game: Frontend

## Description

Dockerized React-Frontend for the Groupproject in "Distributed Systems" @ Fachhochschule OST

## Build Docker Image

```
cd game-frontend/
docker build -t game-frontend:dev .
```

## Run Docker Container

```
docker run -it --rm \
-v ${PWD}:/app \
-v /app/node_modules \
-p 3001:3000 \
-e CHOKIDAR_USEPOLLING=true \
game-frontend:dev
```

=> Open [http://localhost:3001](http://localhost:3001)


## Run frontend on local machine

`npm start`

=> Open [http://localhost:3000](http://localhost:3000)


## Start Test-Runner

`npm test`

## Create New User for Login

URL: localhost/api/users/
METHOD: POST
BODY: {username: ..., password: ...}
