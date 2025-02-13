import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model";
import { hash, verify } from 'argon2'




async function registerUser(req: Request, res: Response): Promise<any> {
    const { fullName, email, password } = req.body;
    if (!fullName) {
        return res.status(400).json({ error: true, message: 'Fullname is required' });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: 'Password is required' });
    }

    try {
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({ error: true, message: 'Usuario no disponible' });
        }

        const hashedPassword = await hash(password);
        const user = new User({ fullName, email, password: hashedPassword });
        await user.save();

        const accessToken = jwt.sign({ user }, process.env.JWT_SECRET as string, {
            expiresIn: '36000m'
        });

        return res.status(200).json({
            error: false,
            user: {
                fullName,
                email,
                _id: user._id,
                createdOn: user.createdOn
            },
            accessToken,
            message: 'User created successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: false, message: 'User resgistration failed!' });
    }

}

async function loginUser(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: 'Password is required' });
    }

    const userInfo = await User.findOne({ email: email });
    if (!userInfo) {
        return res.status(400).json({ error: true, message: 'Usuario no encontrado' });
    }

    const validPassword = await verify(userInfo.password, password);

    if (userInfo.email === email && validPassword) {
        const user = { user: userInfo }
        const accessToken = jwt.sign(user, process.env.JWT_SECRET as string, {
            expiresIn: '36000m'
        });
        return res.json({
            error: false,
            message: 'Login successful',
            email,
            accessToken,
        })
    } else {
        return res.status(400).json({ error: true, message: 'Email o contraseña incorrectos' });
    }

}

async function getUser(req: Request, res: Response): Promise<any> {
    const { user } = req as Request & { user: any }

    const userInfo = await User.findOne({ _id: user.user._id });
    if (!userInfo) {
        return res.status(400).json({ error: true, message: 'User not found' });
    }

    return res.status(200).json({
        error: false, user: {
            fullName: userInfo.fullName,
            email: userInfo.email,
            _id: userInfo._id,
            createdOn: userInfo.createdOn
        }, message: ""
    });

}

export const userController = {
    registerUser,
    loginUser,
    getUser
}