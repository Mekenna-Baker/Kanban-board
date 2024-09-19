import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization; // get auth header
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // get token from header
        const secretKey = process.env.JWT_SECRET_KEY || ''; // get secret key from env
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user; // add user to request object
            return next(); // call next middleware
        });
    }
    else {
        res.sendStatus(401);
    }
};
