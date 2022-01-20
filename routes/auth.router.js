const express = require("express");
const router = express.Router();
const AuthControler = require('../controller/auth.controller');
const jwt = require('jsonwebtoken');

let routes = (app, mongoDbContext, passport) => {
  let authController = new AuthControler(mongoDbContext);
  router.post("/login", authController.login);
  router.post("/register", authController.register);

  router.get("/google/login", passport.authenticate('google', { scope: ['profile','email'] }));

  app.get('/googleRedirect', passport.authenticate('google'), async (req, res) => {
    console.log('redirected', req.user)
    let user = {      
        firstName: req.user.displayName,
        lastName: req.user.name.givenName,
        userName: req.user._json.email,
        provider: req.user.provider,
        role: "Admin"
    };

    let internalUser = await mongoDbContext.user.findOne({userName: req.user._json.email});
    console.log(user);
    if(!internalUser){
      mongoDbContext.user.create(user, (err, createdUser) => {
        if(err)
          throw new Error(err);
        let token = jwt.sign({
          data: {
            iss: 'nodejs-demo',
            sub: createdUser.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1),
            userName: createdUser.userName,
            role: createdUser.role
          }
        }, 'supersecretpass123');
        res.send(token);
      })
    } else {
      let token = jwt.sign({
        data: {
          iss: 'nodejs-demo',
          sub: internalUser.id,
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 1),
          userName: internalUser.userName,
          role: internalUser.role
        }
      }, 'supersecretpass123'); 
      res.send(token);    
    }  
  });

  app.use('/auth', router);
};

module.exports = routes;