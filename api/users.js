import express from 'express';
const router = express.Router();

import { jwtOptions} from '../services/passport-config.js'
import {hashPassword} from '../services/passwordHash.js'

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import {userQueries} from '../model/user.js'

import {setUserWithJWT} from '../services/redis.js'

router.post('/login', async (req, res, next) => {

    try {
        let { login, password} = req.body

        let user = await userQueries.getUserByLogin(login)

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        bcrypt.compare(password, user.passwordHash, async (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            }

            const token = jwt.sign({ id: user.id}, jwtOptions.secretOrKey);

            delete user.passwordHash;
            return res.json({token: token});
        });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});


router.post('/registrate', async (req, res, next) => {
    console.log('req.body',req.body);
    try {
        let {login, password} = req.body
        let passwordHash = await hashPassword(password)
        let response = await userQueries.addUser(login, passwordHash);
        let id = response.id;
        let user = await userQueries.getUserById(id);
        const token = jwt.sign({ id: user.id}, jwtOptions.secretOrKey);
        user.token = token;
        console.log('user',user)
        await setUserWithJWT(user.id, user);

        res.json({message: "success"});
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});

export default router;