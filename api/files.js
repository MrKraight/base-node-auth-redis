import express from 'express';

const router = express.Router();

import { requireAuth } from '../services/passport-config.js'


router.get('/publicFiles', async (req, res, next) => {
    try {
        res.json({message: 'publicFiles'});
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});

router.get('/privateFiles', requireAuth, async (req, res, next) => {
    try {
        res.json({message: 'privateFiles'});
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});


export default router;