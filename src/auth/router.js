'use strict';

import express from 'express';
const authRouter = express.Router();

import User from './model.js';
import Employee from './employees.js';
import auth from './middleware.js';

// Generally, these will send a Token Cookie and do a redirect.
// For now, just spew out the token to prove we're ok.

authRouter.post('/signup', (req, res) => {
  if(Object.keys(req.body).length === 0){
    res.status(400);
    res.send('Bad Request: Request body not received');
    return;
  }
  let user = new User(req.body);
  user.save()
    .then( user => res.send(user.generateToken()) )
    .catch(error=>{
      res.status(400);
      res.send(error);
    });
});

authRouter.get('/signin',auth, (req, res) => {
  res.cookie('Token', req.token);
  res.send('Welcome');
});

authRouter.post('/employees', auth,(req, res) => {
  if(Object.keys(req.body).length === 0){
    res.status(400);
    res.send('Bad Request: Request body not received');
    return;
  }
  User.authorize(req.token)
    .then(user=>{
      req.body.userID = user._id;
      Employee.create(req.body)
        .then(data=>res.send(data));
    }
    );
});
authRouter.get('/employees',auth, (req, res) => {
  User.authorize(req.token)
    .then(user=>{
      Employee.findOne({'userID':user._id})
        .then(data=>res.send(data));
    }
    );
});
authRouter.get('/employees/:id',auth, (req, res) => {
  if(req.params.id === undefined){
    res.status(400);
    res.send('Bad Request: Request body not received');
    return;
  }
  User.authorize(req.token)
    .then(user=>{
      Employee.findOne({'userID':user._id,'_id':req.params.id})
        .then(data=>res.send(data))
        .catch( err => {
          res.status(404);
          res.send(err); 
        });
    }
    );
});
authRouter.put('/employees/:id',auth, (req, res) => {
  if(Object.keys(req.body).length === 0){
    res.status(400);
    res.send('Bad Request: Request body not received');
    return;
  }
  User.authorize(req.token)
    .then(user=>{
      Employee.findOneAndUpdate({'userID':user._id,'_id':req.params.id},{$set:req.body},{new: true})
        .then(data=>res.send(data))
        .catch( err => {
          res.status(404);
          res.send(err); 
        });
    });
});
authRouter.delete('/employees/:id',auth, (req, res) => {
  if(req.params.id === undefined){
    res.status(400);
    res.send('Bad Request: Request body not received');
    return;
  }
  User.authorize(req.token)
    .then(user=>{
      Employee.findOneAndRemove({'userID':user._id,'_id':req.params.id})
        .then(data=>res.send(data))
        .catch( err => {
          res.status(404);
          res.send(err); 
        });
    }
    );
});
authRouter.get('/showMeTheMoney', auth, (req,res) => {
  res.send('Here is all the ca$h');
});

export default authRouter;
