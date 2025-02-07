import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;
    console.log('Register endpoint hit');
    console.log('Request body:', req.body);

    if (!username || !password) {
        console.error('Username or password is missing');
        res.status(400).json({ error: 'Username and password are required' });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        const user = new User({ username, password: hashedPassword });
        await user.save();
        console.log('User saved:', user);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    next();
};

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};