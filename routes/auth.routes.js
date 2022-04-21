const { Router } = require('express');
const router = Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User.model');

router.post('/signup', async (req, res) => {
    const { username, password, biography } = req.body;

    try {
        if(!username || !password){
            throw new Error('Missing username or password')
        }

        const userFromDb = await User.findOne({username});
        if(userFromDb){
            throw new Error('Username already exists')
        }

        const salt =  bcrypt.genSaltSync(12);
        const passwordHash =  bcrypt.hashSync(password, salt);

        await User.create({
            username,
            passwordHash,
            biography
        })

        res.status(201).json('User created!')
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error: error.message})
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if(!username || !password){
            throw new Error('Missing information');
        }

        const userFromDb = await User.findOne({username})
        if(!userFromDb){
            throw new Error('Wrong username or password');
        }

        const validation = bcrypt.compareSync(password, userFromDb.passwordHash);
        if(!validation) {
            throw new Error('Wrong username or password')
        }
        
        const payload = {
            id: userFromDb._id,
            username: userFromDb.username
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1day'
        });

        res.status(200).json({user: payload, token});

    } catch (error) {
        res.status(500).json({message: 'Error trying to login', error: error.message});
    }
})

module.exports = router;