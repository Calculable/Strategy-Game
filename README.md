# Dockecompose
## Run docker-compose
Dockercompose can be started with the following command. This command runs and builds the containers. Adding the -d parameter to the command will start the containers in the background (no console log).
```
docker-compose up --build
```
![DS1-Topology.png](DS1-Topology.png)

### React
- React listens to port 3000. 
- Port 3000 is exposed.

=> Open [http://localhost:3000](http://localhost:3000) (will change in the future)

### Postgres
- Postgres listens to default port 5432. 
- Port is exposed.
- Postgres will create the volume ./pg_data:/data/postgres to backup the database.
- should be reachable on postgres://postgres:postgres@postgres/database

### Django
- Listening to port 80 for Docker container
- Port 8090, 8091 are exposed

### Trafik
Traefik is running as a reversed proxy and is listens to all traffic on port 80 (http).
- Dashboard visible under [http://localhost:80/dashboard/](http://localhost:80/dashboard/)
## Stop docker-compose
```
docker-compose stop
```

## Compleatly cleaning docker
To remove all previously generated containers to start fresh enter:
```
docker system prune --all
```
