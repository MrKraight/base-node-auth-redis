import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

import {getUserWithJWT} from '../services/redis.js'

import dotenv from 'dotenv';
dotenv.config();
const authSecret = process.env.AUTH_SECRET;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: authSecret
};

passport.use(new Strategy(jwtOptions, async (jwtPayload, done) => {
  console.log('using passport.authenticate');
  const user = (await getUserWithJWT(jwtPayload.id));
  if (!user) {
    return done({ name: 'UnauthorizedError', message: 'Unauthorized' }, false);
  }

  return done(null, user);
}));

const requireAuth = ( req, res, next) => {

  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if(!res || !res.status)
      return;
    if (error) {
      // Handle error, e.g., log it
      console.log('Authentication Error:', error);
      return res.status(401).json({ message: `Authentication Error: ${error}` })
    }

    if (!user) {
      // Handle unauthorized access, e.g., log it
      console.log('Unauthorized Access:', info.message);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Authentication successful, proceed to the next middleware
    req.user = user;
    next();
  })(req, res, next);
}


function authRole(requiredRoles) {
  return (req, res, next) => {
    if (req.user && req.user.role && requiredRoles.includes(req.user.role)) {
      next(); // User has the required role, proceed to the next middleware/route handler
    } else {
      res.status(403).json({ message: 'Access forbidden' });
    }
  };
}

export { passport, jwtOptions, requireAuth, authRole };