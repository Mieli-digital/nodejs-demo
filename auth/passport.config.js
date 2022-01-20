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
    secretOrKey   : process.env.JWT_SECRET
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
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_PASSWORD,
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
