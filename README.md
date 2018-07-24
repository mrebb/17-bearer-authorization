![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 17: Bearer Auth
===
<img src="https://travis-ci.com/mrebb/17-bearer-authorization.svg?branch=madhu">

## TRAVIS: https://travis-ci.com/mrebb/17-bearer-authorization

## HEROKU: https://mongodb-lab17.herokuapp.com

## mLab: mongodb://testUser:test@123@ds239557.mlab.com:39557/heroku_lmhxqkb3 

## Sample env: 
PORT=3000
MONGODB_URI=mongodb://username:password@ds239557.mlab.com:39557/heroku_lmhxqkb3

## Server Endpoints

### `/api/signup`
* `POST` request
* the client should pass the username and password in the body of the request
* the server should respond with a token (generated using `jwt`)
* the server should respond with **400 Bad Request** to a failed request
    * Sample REQUEST & RESPONSE using POSTMAN for 200 status code
    ```POST: https://mongodb-lab17.herokuapp.com/api/signup```

      ```sample request body : {"username":"madhu", "password":"foo", "email":"foo@bar.com"}```

      ``` Response as token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNTVlMzA0ZDAzN2NhMDAxNDdkMmYwNSIsImlhdCI6MTUzMjM1NTMzMn0.y_0CzWrETYsvh064s7MU5cEDERw1rTdq7V```

      ```mlab database user table after signup look like this  { "_id": { "$oid": "5b55e304d037ca00147d2f05"},"username":"madhu","password":"$2b$10$yKYEDb3bMh..uQ3IN6NXWuU4O421uHJSX8UQrCKIGlTZ38uVk3h6","email": "foo@bar.com","__v": 0}         ```

### `/api/employees`
* `POST` request
* pass data as stringifed JSON in the body of a post request to create a new resource
   * Sample REQUEST & RESPONSE using POSTMAN for 200 status code
    ```POST: https://mongodb-lab17.herokuapp.com/api/employees```

    ```sample request body : {"name":"employee1"}```
    ```use Bearer token recieved after signup : Authorization: Bearer bWFkaHU6Zm9v```
    ```Response : {
    "_id": "5b5668eb41844780c88e1c85",
    "name": "employee1",
    "userID": "5b5668d041844780c88e1c84",
    "__v": 0
    }  ```

### `/api/employees/:id`
* `GET` request
* pass the id of a resource though the url endpoint to `req.params` to fetch a resource   
   * Sample REQUEST & RESPONSE using POSTMAN for 200 status code
    ```GET: https://mongodb-lab17.herokuapp.com/api/employees/5b5668eb41844780c88e1c85```
    ```use Bearer token recieved after signup : Authorization: Bearer bWFkaHU6Zm9v```
    ```Response : {
    "_id": "5b5668eb41844780c88e1c85",
    "name": "employee1",
    "userID": "5b5668d041844780c88e1c84",
    "__v": 0
    }  ```
* `PUT` request
* pass data as stringifed JSON in the body of a put request to update a resource
     * Sample REQUEST & RESPONSE using POSTMAN for 200 status code
    ```PUT: https://mongodb-lab17.herokuapp.com/api/employees/5b5668eb41844780c88e1c85```

    ```sample request body : {"name":"employee3"}```
    ```use Bearer token recieved after signup : Authorization: Bearer bWFkaHU6Zm9v```
    ```Response : {
    "_id": "5b5668eb41844780c88e1c85",
    "name": "employee3",
    "userID": "5b5668d041844780c88e1c84",
    "__v": 0
    } ```
      
* `DELETE` request
* pass the id of a resource though the url endpoint *(using `req.params`)* to delete a resource   
    * Sample REQUEST & RESPONSE using POSTMAN for 200 status code
    ```DELETE: https://mongodb-lab17.herokuapp.com/api/employees/5b5668eb41844780c88e1c85```

    ```sample request body : {"name":"employee3"}```
    ```use Bearer token recieved after signup : Authorization: Bearer bWFkaHU6Zm9v```
    ```Response : {
    "_id": "5b5668eb41844780c88e1c85",
    "name": "employee3",
    "userID": "5b5668d041844780c88e1c84",
    "__v": 0
    } ``` 

### `/api/signin`
* `GET` request
* the client should pass the username and password to the server using a `Bearer token` authorization header
* use middleware to parse the auth header for username/password
* the server should respond with a token for authenticated users
* the server should respond with **401 Unauthorized** for non-authenticated users
    ## Sample REQUEST & RESPONSE using POSTMAN
     ```1) GET: https://mongoldb-lab17.herokuapp.com/api/signin```

      ```use Bearer Auth : Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNTVmMmE4M2MyMzBjMDAxNDYwNTA1MiIsImlhdCI6MTUzMjM1OTMzNn0.goaByCHn4VnC1FIMbumW-33PwaxRmjdrO1JVrrnYQTE```
      
      ```Response:                                                 Welcome     ```

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
