import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization; // get auth header

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // get token from header

    const secretKey = process.env.JWT_SECRET_KEY || ''; // get secret key from env

    jwt.verify(token, secretKey, (err, user) => { // verify token
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }

      req.user = user as JwtPayload; // add user to request object
      return next(); // call next middleware
    });
  } else {
    res.sendStatus(401);
  }
};
