const { mongo } = require('mongoose');
const passport = require('passport')
const passportJWT = require("passport-jwt");
const passportGoogle = require("passport-google-oauth20");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const GoogleStrategy = passportGoogle.Strategy;

module.exports = (mongoDbContext) => {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'supersecretpass123'
  },
  (jwtPayload, done) => {
    return mongoDbContext.user.findById(jwtPayload.data.sub)
    .then(user => 
    {
      return done(null, user);
    }
  ).catch(err => 
  {
    return done(err);
  });
  }
  ));

  passport.use(new GoogleStrategy({
    clientID: "202216913896-71nnrm48lbnlct5g4nskmiq7b5eejg0b.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/googleRedirect"
  },
  (accessToken, refreshToken, profile, done) => {
      //console.log(accessToken, refreshToken, profile)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
      return done(null, profile)
  }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user)
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj)
  });
}
