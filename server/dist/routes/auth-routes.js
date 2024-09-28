import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body; // get username and password from request body
    const user = await User.findOne({
        where: { username },
    });
    if (!user) {
        return res.status(404).json({ message: 'Authentication failed. User not found.' });
    }
    const passwordIsValid = await bcryptjs.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
    }
    const secretKey = process.env.JWT_SECRET_KEY || ''; // get secret key from env
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
