const { Router } = require('express');
const router = Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

router.post('/signup', async (req, res) => {
    const { username, password, biography, spaces, events } = req.body;

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
            biography,
            spaces,
            events
        })

        res.status(201).json('User created!')
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error})
    }
})

module.exports = router;