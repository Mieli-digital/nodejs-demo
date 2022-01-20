const { mongo } = require('mongoose');
const passport = require('passport')
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (mongoDbContext) => {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'supersecretpass123'
  },
    (jwtPayload, done) => {
     return mongoDbContext.user.findById(jwtPayload.sub)
     .then(user => 
     {
       return done(null, user);
     }
   ).catch(err => 
   {
     return done(err);
   });
  }
  ))
}
