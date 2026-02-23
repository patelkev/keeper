import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

// Local Strategy for username/password login
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use email instead of username
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        
        if (!isMatch) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT Strategy for protected routes
// This will be initialized when the module is imported
// Make sure dotenv.config() is called before importing this module
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required. Make sure to call dotenv.config() before importing this module and set JWT_SECRET in your .env file.');
}

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        
        if (user) {
          return done(null, user);
        }
        
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
