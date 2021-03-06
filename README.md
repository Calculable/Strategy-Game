# Strategy Game

## About
This README-File contains the documentation and architectural decision record for the "strategy game"-project. This project was built for the challenge-task in the module "distributed systems" at Fachhochschule OST.

## Architecture Overview
![topology](topology.png)
## Loadbalancer
As a loadbalancer for the application we decided to use Traefik. We decided to use traefik due to the fact, that it is very well documented and presented in the course. Traefik is designed to be used with virtualisation technologies and is open source.

## Backend
Our goal with this assignment was to learn new technologies. Therefore we decided to use Django. Django is a very powerful web framework for python. We had some previous experiences with python but barely any with Django. We decided, that we want to implement our REST service with Django.

### Login and JWT Tokens

#### Create a user

To login for the first time, a user has to be added to the database. 

![](frontend/documentation/Login1.png)

The user can also be created with Postman:
```
URL: localhost/api/users/
METHOD: POST
BODY: {username: ..., password: ...}
```

![Create-User-Request in Postman](frontend/documentation/postman_request.png)

If the registration of the new user was successful, a JWT-Token will be created and returned to the client.

Users can login with another API-Call:

![](frontend/documentation/LoginForm.png)

![](frontend/documentation/Login2.png)

If the provided credentials are correct, the token will be returned from the server to the client (frontend) where it will be added to the local storage:

![](frontend/documentation/Login3.png)

For all the requests where the client has to be authenticated, it will send the token to the server:

![](frontend/documentation/Login4_new.png)


## Frontend

### React Technology Stack

To write our frontend service we decided to use React. React is the most popular frontend framework and therefore provides a lot of great documentation. React was another new technology to us. We had previous experiences with javascript and npm but we have never used React before this assignment.


The frontend uses the following other technologies:

- JS/HTML
- React Testing Library / React Dom
- Bootstrap
- JWT Token
- normalize.css
- jQuery

### Current Version of NPM Libraries

The Tool `npm-check` was used to validate that all libraries are installed with their newest version.

This screenshot shows `npm-check` before updating the libraries.
![](frontend/documentation/version-check.png)

The libraries-Version were last checked on Mai 13 2021, 16:00 

### Screenshots / Responsive Layout

Frontend on a large screen:

![](frontend/documentation/large.png)

Frontend on a small / mobile screen:

![](frontend/documentation/mobile.png)


### Boostrap

We used boostrap and it's CSS-files to speed up development. The Boostrap-Dependency is added via npm. We also used popper.js to create modal dialogs:

 ![](frontend/documentation/modalDialog.png)


### Run frontend on local machine

`npm start`

=> Open [http://localhost:3000](http://localhost:3000)


### Run the tests

To start Test-Runner:

`npm test`

Afterwards, press "a" to run all the tests.

![Test-Output](frontend/documentation/tests.png)

### User Interface with React

The User Interface is built with several nested React Components:

![](frontend/documentation/ReactUI.png)

(Some Components are not shown in this diagram to reduce complexity)

## Database
To store the data we use a PostgreSQL database. PostgreSQL is used due to the fact, that we can make great use of a ralational database as shown in the digram below. Our database is generated from our python backend code.

![database](database.png)

## Dockercompose
### Run docker-compose
Dockercompose can be started with the following command. This command runs and builds the containers. Adding the -d parameter to the command will start the containers in the background (no console log).
```
docker-compose up --build
```
![DS1-Topology.png](topology.png)

### React
- React listens to port 3000. 
- Port 3000 is exposed.

=> Open [http://localhost:3000](http://localhost:3000)

### Postgres
- Postgres listens to default port 5432. 
- Postgres will create the volume pg_data:/data/postgres to backup the database

### Django
- Listening to port 80 for Docker container
- Containers are only reachable through Traefik

### Traefik
Traefik is running as a loadbalancer for the django containers. Traefic is listening to all traffic on port 80 (http).

## Stop docker-compose
```
docker-compose stop
```

## Compleatly cleaning docker
To remove all previously generated containers to start fresh, enter:
```
docker system prune --all
```
### Remove volume
To see all volumes:
```
docker volume ls
```
To remove strategy game volume:
```
docker rm postgres
docker volume rm ds1-strategygame_pg_data
```


----





 
## Architectural Decisions

### Client-Side Rendering

We decided to use React for our Client-Side rendering, mainly because it allowed us to distribute the work between the team-members easier. That way we had to excactly define our API-Endpoints and how the Backend and the Frontend should communicate.

### Redundance

Looking at the code in the frontend there seems to be a lot of redundancy. We decided not to represent our different types of "buildings" in a generic way (for example we have a database table for each type of building instad of a generic table "building"). For now the functionality for the different types of building is more or less the same which brings some redundancy into the code. The reason why we accepted some redundancy instead of introducing a new abstraction layer was because we thought it might be possible that each type of building will get more indidivual behaviour if the game was developed further. 

### Common UI-Components

We used a React-"Layout" to define common components that should be visible on more than one page (mainly for the navbar). The alternative would have been to copy-paste the common components to each page where they are needed. We choose the React-Layout to reduce redundancy, accepting that the code became a little bit more complex.

### Polling vs. Websockets

The ressources of a user are dependant on the time so we have to refresh the UI every now and then. We could have used Sockets (for example with socket.io) so the server could inform the client about changes. We evaluated socket.io but decided against it because we think it would introduce a lot of complexity into our code especially because we use multiple instances of our service and a load balancer which makes it even harder to maintain an persistent connection between the server and the client (we wanted to have stateless services). Instead we decided that the client (frontend) polls the server every 10 seconds. This solution has the disadvantage that it is not very performant because the server has to do the same calculation over and over again when sometimes there is not even a new result. This solution would also not scale very well if there were many users playing at the same time but it sould work fine for our use-case. Because we use React, the frontend is only repainted if there is a change in the data.

### Bootstrap Grid System vs. CSS Grid

We displayed the types of buildings in a grid. As we already use Bootstrap we could have used the Boostrap Grid System to display the responsive grid but we decided to use the built-in CSS grid to be more independant from bootstrap and because we thought that CSS Grid was easier to use for our use-case. 

### CSS Normalize vs. CSS Reset

We decied to use CSS Normalize instead of a CSS Reset because we wanted to have some Pre-Styled Components to speed-up development, accepting that we loose some control about how our components look like in different browsers.

### Mocked Backend

To be able to develop the frontend independant from the backend-services, we created a Mock-Backend for testing and development. This Mock-Backend was then replaced by AJAX-Calls to the "real backend" as soon as the Backend implemented those endpoints.