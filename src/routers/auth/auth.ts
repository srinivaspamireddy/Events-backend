import { Router } from 'express';
import passport from '../../config/passport';
import { sign, Secret, JwtPayload, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';
import { jwtSign } from '../../utils/jwtSign';

let JWT_SECRET: Secret;
if (!process.env.JWT_SECRET) {
  throw new Error("cannot be undefined")
} else {
  JWT_SECRET = process.env.JWT_SECRET
};

const signInOptions: SignOptions = {
  // RS256 uses a public/private key pair. The API provides the private key
  // to generate the JWT. The client gets a public key to validate the
  // signature
  expiresIn: '30d'
};
const authRouter = Router();
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
authRouter.get('/google/callback',
  passport.authenticate('google'),
  jwtSign, (req, res) => {
  }
)
authRouter.get('/api/logout', (req, res) => {

  res.send(req.user);
});

authRouter.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

export default authRouter;