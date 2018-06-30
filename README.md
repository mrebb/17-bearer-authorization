![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 17: Bearer Auth
===
<img src="https://travis-ci.com/mrebb/17-bearer-authorization.svg?branch=madhu">

## TRAVIS: https://travis-ci.com/mrebb/17-bearer-authorization

## HEROKU: https://mongodb-lab17.herokuapp.com

## Server Endpoints

### `/api/signup`
* `POST` request
* the client should pass the username and password in the body of the request
* the server should respond with a token (generated using `jwt`)
* the server should respond with **400 Bad Request** to a failed request

### `/api/resource-name`
* `POST` request
* pass data as stringifed JSON in the body of a post request to create a new resource

### `/api/resource-name/:id`
* `GET` request
* pass the id of a resource though the url endpoint to `req.params` to fetch a resource   
* `PUT` request
* pass data as stringifed JSON in the body of a put request to update a resource
* `DELETE` request
* pass the id of a resource though the url endpoint *(using `req.params`)* to delete a resource   

### `/api/signin`
* `GET` request
* the client should pass the username and password to the server using a `Basic:` authorization header
* use middleware to parse the auth header for username/password
* perform some basic validation
* the server should respond with a token for authenticated users
* the server should respond with **401 Unauthorized** for non-authenticated users

## Tests
* created a test to ensure that your API returns a status code of 404 for routes that have not been registered
* created a series of tests to ensure that `/api/employees` endpoint responds as described for each condition below:
* `GET` - responds **200**, for a request made with a valid id
* `GET` - responds **401**, if no token was provided
* `GET` - responds **404**, for a valid request with an id that was not found
* `PUT` - responds **200**, for a post request with a valid body
* `PUT` - responds **401**, if no token was provided
* `PUT` - responds **400**, if the body was invalid
* `PUT` - responds **404**, for a valid request made with an id that was not found
* `POST` - responds **200**, for a post request with a valid body
* `POST` - responds **401**, if no token was provided
* `POST` - responds **400**, if no body was provided or if the body was invalid
