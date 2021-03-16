# Dockecompose
## Run docker-compose
Dockercompose can be started with the following command. This command runs and builds the containers. Adding the -d parameter to the command will start the containers in the background (no console log).
```
docker-compose up --build
```

### React
- React listens to port 3000. 
- Port 3000 is exposed.

=> Open [http://localhost:3000](http://localhost:3000) (will change in the future)

### Postgres
- Postgres listens to default port 5432. 
- Port is exposed.
- Postgres will create the volume ./pg_data:/data/postgres to backup the database.

### Trafic
Traefic is running as a reversed proxy and is listens to all traffic on port 80 (http).
- Dashboard visible under [http://localhost:8080](http://localhost:8080)
- through traefic the react container can be accessed on [http://frontend.localhost](http://frontend.localhost)
## Stop docker-compose
```
docker-compose stop
```

## Compleatly cleaning docker
To remove all previously generated containers to start fresh enter:
```
docker system prune --all
```