'use strict';
const superagent = require('superagent');
const mongoose = require('mongoose');
const app = require('../../../src/app.js');
var token;
describe('Authentication Server', () => {
  var server;
  const PORT = 8888;
  server = app.start(PORT);
  beforeAll( () => {
    mongoose.connect(process.env.MONGODB_URI);
  });
  afterAll( () => {
    mongoose.connection.db.dropCollection('users');
    mongoose.connection.db.dropCollection('employees');
    mongoose.connection.close();
    server.close();
  
  });
  it('should create a user login on signup',() =>{
    return superagent.post('http://localhost:8888/api/signup')
      .send({username:'madhu', password:'foo', email:'foo@bar.com'})
      .then(response=>{
        token = response.text;
        expect(response.statusCode).toEqual(200);
        expect(response.text).toBeDefined;
      })
      .catch(err=>expect(err).toEqual('nothing here'));
  });
  it('should get 200 for getting all employee records',() =>{
    return superagent.post('http://localhost:8888/api/employees')
      .set({'Authorization': `Bearer ${token}` })
      .send({name:'employee1'})
      .then(response=>{
        expect(response.statusCode).toEqual(200);
        return superagent.get('http://localhost:8888/api/employees')
          .set({'Authorization': `Bearer ${token}` })
          .then(response=>{
            expect(response.statusCode).toEqual(200);
            let actual = response.text.toString();
            let employee = JSON.parse(actual);
            expect(employee[0].name).toEqual('employee1');
          })
          .catch(err=>expect(err).toEqual('nothing here'));
      });
  });
  it('should get 200 for getting a particular employee record',() =>{
    return superagent.post('http://localhost:8888/api/employees')
      .set({'Authorization': `Bearer ${token}` })
      .send({name:'employee2'})
      .then(response=>{
        expect(response.statusCode).toEqual(200);
        let actual = JSON.parse(response.text);
        expect(actual.name).toEqual('employee2');
        return superagent.get(`http://localhost:8888/api/employees/${actual._id}`)
          .auth('madhu','foo')
          .then(response=>{
            expect(response.statusCode).toEqual(200);
            let actual = JSON.parse(response.text);
            expect(actual.name).toEqual('employee2');
          })
          .catch(err=>expect(err).toEqual('nothing here'));
      });
  
  });
  it('should get 404 for valid get request to resource with an id that was not found',() =>{
    
    return superagent.get('http://localhost:8888/api/employees/767362637273')
      .set({'Authorization': `Bearer ${token}` })
      .catch(err=>{
        expect(err.status).toEqual(404);
        expect(err.toString()).toEqual('Error: Not Found');
      });
  });
  it('should get 401 for get request to resource with bad login',() =>{
    return superagent.get('http://localhost:8888/api/employees/5b37f56e9ad5176907b610c3')
      .auth('','foo')
      .catch(err=>{
        expect(err.status).toEqual(401);
        expect(err.toString()).toEqual('Error: Unauthorized');
      });
  
  });
 
  it('should get 400 for PUT request when no body was provided',() =>{
    
    return superagent.put('http://localhost:8888/api/employees/5b37f56e9ad5176907b610c3')
      .set({'Authorization': `Bearer ${token}` })
      .catch(err=>{
        expect(err.status).toEqual(400);
        expect(err.toString()).toEqual('Error: Bad Request');
      });
  });
  it('should get 404 for a valid PUT request made with an id that was not found',() =>{
    
    return superagent.put('http://localhost:8888/api/employees/2323232323')
      .set({'Authorization': `Bearer ${token}` })
      .send({name:'updatedemployee'})
      .catch(err=>{
        expect(err.status).toEqual(404);
        expect(err.toString()).toEqual('Error: Not Found');
      });
  });
  it('should get 401 for PUT request for a bad login',() =>{
    
    return superagent.put('http://localhost:8888/api/employees/5b37f56e9ad5176907b610c3')
      .auth('','')
      .send({name:'employee9'})
      .catch(err=>{
        expect(err.status).toEqual(401);
        expect(err.toString()).toEqual('Error: Unauthorized');
      });
  });
  
  it('should handle updating a particular employee record',() =>{
    return superagent.post('http://localhost:8888/api/employees')
      .set({'Authorization': `Bearer ${token}` })
      .send({name:'employee3'})
      .then(response=>{
        expect(response.statusCode).toEqual(200);
        let actual = JSON.parse(response.text);
        expect(actual.name).toEqual('employee3');
        return superagent.put(`http://localhost:8888/api/employees/${actual._id}`)
          .auth('madhu','foo')
          .send({name:'employee4'})
          .then(response=>{
            expect(response.statusCode).toEqual(200);
            let actual = JSON.parse(response.text);
            expect(actual.name).toEqual('employee4');
          })
          .catch(err=>expect(err).toEqual('nothing here'));
      });
  
  });
  it('should get 401 for POST request with bad login',() =>{
    return superagent.post('http://localhost:8888/api/employees')
      .auth('madhu','')
      .send({name:'newEmployee'})
      .catch(err=>{
        expect(err.status).toEqual(401);
        expect(err.toString()).toEqual('Error: Unauthorized');
      });
  });
  it('should get 400 for POST request when no body was provided',() =>{
    return superagent.post('http://localhost:8888/api/employees')
      .set({'Authorization': `Bearer ${token}` })
      .catch(err=>{
        expect(err.status).toEqual(400);
        expect(err.toString()).toEqual('Error: Bad Request');
      });
  });
  it('should get 200 for posting an employee record',() =>{
    
    return superagent.post('http://localhost:8888/api/employees')
      .set({'Authorization': `Bearer ${token}` })
      .send({name:'employee5'})
      .then(response=>{
        expect(response.statusCode).toEqual(200);
        let actual = JSON.parse(response.text);
        expect(actual.name).toEqual('employee5');
      })
      .catch(err=>expect(err).toEqual('nothing here'));
  
  });
  it('should delete a particular employee record',() =>{
    return superagent.post('http://localhost:8888/api/employees')
      .set({'Authorization': `Bearer ${token}` })
      .send({name:'employee6'})
      .then(response=>{
        expect(response.statusCode).toEqual(200);
        let actual = JSON.parse(response.text);
        expect(actual.name).toEqual('employee6');
        return superagent.delete(`http://localhost:8888/api/employees/${actual._id}`)
          .auth('madhu','foo')
          .then(response=>{
            expect(response.statusCode).toEqual(200);
            let actual = JSON.parse(response.text);
            expect(actual.name).toEqual('employee6');
          })
          .catch(err=>expect(err).toEqual('nothing here'));
      });
  });
  it('gets a 401 on a bad login', () => {
    return superagent.get('http://localhost:8888/api/signin')
      .then(response => {expect(response).toEqual('nothing here');
      })
      .catch(response => {
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 401 on a bad login', () => {
    return superagent.get('http://localhost:8888/api/signin')
      .auth('foo','bar')
      .then(response => {expect(response).toEqual('nothing here');
      })
      .catch(response => {
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 200 on a good login', () => {
    return superagent.get('http://localhost:8888/api/signin')
      .auth('madhu','foo')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual('Welcome');
      })
      .catch(console.err);
  });
  it('should throw 400 error if no request body found for user signup request',() =>{
    return superagent.post('http://localhost:8888/api/signup')
      .then(response=>{
        expect(response.statusCode).toEqual(200);
      })
      .catch(err=>{
        expect(err.status).toEqual(400);
        expect(err.toString()).toEqual('Error: Bad Request');
      });
  });
  it('should throw 400 error if duplicate username is posted',() =>{
    return superagent.post('http://localhost:8888/api/signup')
      .send({username:'madhu', password:'foo', email:'foo@bar.com'})
      .catch(err=>{
        expect(err.status).toEqual(400);
        expect(err.toString()).toEqual('Error: Bad Request');
      });
  });
  it('should throw 404 if route not found',() =>{
    return superagent.post('http://localhost:8888/noroute')
      .set({'Authorization': `Bearer ${token}` })
      .catch(err=>{
        expect(err.status).toEqual(404);
        expect(err.toString()).toEqual('Error: Not Found');
      });
  });

});
