import googleAuth from 'passport-google-oauth20'
const GitHubStrategy = require('passport-github').Strategy;
import 'dotenv/config';
import passport from 'passport';
import { User } from '../entities/User';

if (process.env.GOOGLE_CLIENT_ID  === undefined) {
  throw new Error("cannot be undefined")
}
if (process.env.GOOGLE_CLIENT_SECRET === undefined) {
  throw new Error("cannot be undefined")
}
const GoogleStrategy = googleAuth.Strategy;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
  async(accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
      const user = new User();
      const existingUser = await User.findOneBy({
        accountId: profile.id
      });
      
      if (existingUser) {
        console.log('user exits ', existingUser);
        return done(null, existingUser);
      }
      // if no user exists , create the user in db
      user.accountId = profile.id;
      user.accountType = 'google';
      user.email = profile.emails[0].value;
      user.firstName = profile.name.givenName;
      user.lastName = profile.name.familyName;
      console.log('user ', user);
      await user.save();
      return done(null, existingUser)
    } catch (error) {
      console.log('error ', error);
      return done(error, false)
    }
  }
));

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
  User.findOneBy({ id }).then(user => {
    done(null, user);
  });
});

export default passport;