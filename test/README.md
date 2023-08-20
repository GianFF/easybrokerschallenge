# Testing 

We follow the pattern Arrange-Act-Assert and try to TDD everything.


### API tests

This suite is designed to integrate all elements in the application while hitting the API endpoints.
It checks the integration between all elements is working as expected.

Services doing external requests will be supplied by their mock instances, thus that no request will be made to the outside application. 
An in memory mongo DB will be used instead of the productive one.

<img width="610" alt="Code Coverage" src="https://github.com/GianFF/easybrokerschallenge/assets/11510367/909eb124-52fc-4d8d-a036-eba3392af135">


### Integration tests

[This suite lives in Postman](https://edymberg.postman.co/workspace/Team-Workspace~c4e09567-6ae9-4192-829b-cc25a198e607/api/69ae29ee-eb52-4bf0-817d-618e28b39212) ask for invitation.   
It's designed to run all tests using the real API and DB, but also all the real components hierarchy.   
It would be run on each commit by a Github Action using docker-compose to start the application and hit the API.

These are examples of Postman tests and the Github Action output:

<img width="530" alt="Postman tests output" src="https://github.com/GianFF/easybrokerschallenge/assets/11510367/6a2ebf68-0342-4fc1-893b-bc4062dbcc8e">
