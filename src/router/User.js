const express = require('express');
const router = express.Router();
const login = require('../usecases/Login');
const User = require('../Models/User');
const bcrypt = require('../lib/bcrypt');

router.post('/login', async(req, res) => {
    try {
        const data = req.body;
        const userData = await login.getLogin(data.email, data.password);
        res.json({
            success: true,
            message: 'Logged in user',
            data: userData,
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Something went wrong with the login',
            error: error.message,
        });
    }
});

router.post('/', async(req, res) => {
    try {
        const user = req.body;
        const hash = await bcrypt.hash(user.password);
        const newUser = await User.create({ email: user.email, password: hash });
        res.json({
            success: true,
            message: 'User created succesfully',
            data: {
                newUser,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed creating a new task',
            error: error.message,
        });
    }
});

module.exports = router;