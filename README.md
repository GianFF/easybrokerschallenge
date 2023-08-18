# EasyBroker challenge

- [Project setup](#project-setup)
- [Local Setup](#local-setup)
- [App setup with Docker](#app-setup-with-docker)
- [Testing](#testing)
- [Architectural Decisions](#architectural-decisions)

---

## Project setup
- `cp .env-example .env`
- `nvm use`
- `npm ci`
- `npm run tests`

## Local Setup

You can startup the DB using a Docker image as follows:
* `docker build -f Dockerfile.mongoDB . -t easybrokerDB`
* `docker run --publish 27017:27017 easybrokerDB`  

And then just start the server:
* `npm run serve`

## App setup with Docker
`docker compose up -d --wait --wait-timeout 60 --build`

## Testing
The intention is to have a high code coverage, but not more important is to have the core features well tested (unit and integration).

Go to: [Testing REAMDE](https://github.com/GianFF/easybrokerschallenge-service/blob/main/test/README.MD)

## Architectural Decisions
* Github Actions for CI/CD running workflos on main branch.
  - each commit on main builds a new Docker image and push it to the Registry.
  - each commit on every branch runs tests, linter, and also integration_tests using POSTMAN and docker-compose in the Github Action VM.
  - main branch is be protected, restricting devs to merge a broken PR. Saving the CD workflow to build broken images.
* Node JS with Express and vanilla Javascript to build the Client API.
* Unit testing with Jest.
* Eslint to keep code consistency.
* Docker Images repositories:
  - [API](https://hub.docker.com/repository/docker/edymberg/easybrokerschallenge/general)
