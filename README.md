# EasyBroker challenge

- [EasyBroker challenge](#easybroker-challenge)
    - [What's this about?](#whats-this-about)
    - [Note for the Reviewer](#note-for-the-reviewer)
  - [Project setup](#project-setup)
    - [Local Setup](#local-setup)
    - [Docker Setup](#docker-setup)
  - [Architectural Decisions](#architectural-decisions)
  - [Testing](#testing)

---

### What's this about? 

This is an example of how I like to craft code.   
The code example is about a Zoo in NodeJS, where animals can be creatred through an API and asked to speak.  

The idea was to show different patterns and aspects of my development skills, like:
* Composition over Inheritance
* Dependency Injection and Inversion of control
* SOLID principles
* TDD
* CI / CD workflows knowledge
* some DevOps with Docker

### Note for the Reviewer

I suggest start reading this Readme and following the links.
Then maybe you can take a look to the tests, and then the `./src/domain` folder.

If you're interested in the API and DB you can follow the paths to that.

--- 

## Project setup
- `cp .env-example .env`
- `nvm use`
- `npm ci`
- `npm run tests`

### Local Setup

You can startup the DB using a Docker image as follows:
* `docker build -f Dockerfile.mongoDB . -t easybrokerDB`
* `docker run --publish 27017:27017 easybrokerDB`  

And then just start the server:
* `npm run serve` 
* or run the debug script so you can add breakpoints in the code.

### Docker Setup
`docker compose up -d --wait --wait-timeout 60 --build`

## Architectural Decisions
Github Actions for CI/CD
- CD: each commit on main builds a new Docker image and push it to the Registry ([API repository](https://hub.docker.com/repository/docker/edymberg/easybrokers/general)).
- CI: each commit on every branch runs tests, linter, and also integration_tests using POSTMAN and docker-compose in the Github Action VM.
- main branch is protected, restricting devs to merge a broken PR. Saving the CD workflow to build a broken image.

Code structure separated in layers
- API
- Services
- Repositories
- Domain

Technologies:
* Node JS with Express and vanilla Javascript to build the Client API.
* Testing with Jest.
* Eslint to keep code consistency.
* Github Actions for workflows
* Postman for API (integration) Testing
* Docker & docker-compose

## Testing
The intention is to have a high code coverage.  
Go to: [Testing REAMDE](https://github.com/GianFF/easybrokerschallenge/blob/documentation/test/README.md)
