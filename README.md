# What I would do differently in production:

* I would use a migration management system like Alembic to manage the database schema.
* I would fix the UI (there are some bugs).
* I would add automated tests. I didn't deem them necessary for this exercise.
* I would add load balancing, production dockerfiles and a production docker-compose file.

The excersice is only for user management, however I have made the manager hooks, api client and backend reusable for to be able to potentially scale up easier. Due to the instructions of the project I haven't included an update endpoint nor made frontend functionality for it. The manager class on the backend does however have this and it should work.

# How to run the application:

* Install docker.
* Run`docker compose up` in the root directory of the project.


***Original instructions:***

# Full Stack Developer assignment

A base project is provided with Docker Compose including the following components:

- A backend with FastAPI and SQLAlchemy installed, but no code
- A frontend directory with only a Dockerfile
- A PostgreSQL database without tables

The task is to write the missing code and make the necessary package installations and
changes to produce a system with one backend and one frontend. The main feature of the
system are basic CRUD operations on a user.

The resulting system does not need to have production quality code and solutions (to not
spend too much time on this assignment), but the assignee should be able to explain why
various choices were made and what could be improved if the application would go live.

Unless explicitly stated, any solution will do, as long as it satisfies the requirements.
There is no one right answer for this assignment, but you should strive to demonstrate
reasonably clean code and good solutions.

Docker Compose should be used. When the assignment is reviewed, the reviewers should only
need to run `docker-compose up -d --build` and the backend will start running in
[localhost:8000](http://localhost:8000) and the frontend in
[localhost:3000](http://localhost:3000). A base `docker-compose.yml` and a `Dockerfile`
for the backend and frontend are provided for this, but they can be modified if necessary.

Also use `docker-compose up -d --build` yourself to work with the project. Be aware that,
although the `docker-compose.yml` is provided, you will need to do some initial code to
the backend and frontend directories for the containers to build and start. This is part
of the assignment.

**Notice:** To ease development, the backend and frontend have the src directories bind
mounted in the `docker-compose.yml`, so you might want to have the code in those
directories.

## Requirements

### Backend

- [ ] Preferably use FastAPI and SQLAlchemy if you already know these technologies. Otherwise,
  you are free to choose any python web framework of your liking. In case of the latter you
  need to modify at least`docker-compose.yml` and`requirements.txt` in order for the
  application to run.
- [ ] A`user` table with the following fields should be automatically created when the
  containers start (the`DATABASE_URL` env variable has the connection string):
  - id
  - name
  - email
- [ ] Create a`GET /users/` endpoint that returns a list of all users (fields: ID, name,
  email).
- [ ] Create a`POST /users/` endpoint that creates a new user (fields: name, email).
- [ ] Create a`DELETE /users/<id>` endpoint that deletes a user.

### Frontend

- [ ] React and TypeScript must be used.
- [ ] The frontend should run in[localhost:3000](http://localhost:3000) with`npm start`
  (pre-configured in`frontend/Dockerfile`).
- [ ] The frontend should have the functionality to
  - [ ] list all users with their ID, name, and email
  - [ ] create a new user with its name and email
  - [ ] delete a user
- [ ] The UI should look reasonably good.
  - [ ][Bootstrap](https://getbootstrap.com) or similar library can be used to quickly
    achieve this.
- [ ] The UI should be responsive, scaling for both desktop and mobile.
