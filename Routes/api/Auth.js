const express = require('express');

const router = express.Router();

const auth = require('../../Middleware/auth');
const User = require('../../Modal/User');

const jwt = require('jsonwebtoken')

const config = require('config');
const bcrypt = require('bcryptjs');

const {
    check,
    validationResult
} = require('express-validator')

//@route  GET api/auth
//@desc auth ROute  
//access public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(err.message);
        res.json(500).send('auth server error')
    }
});

//Log In authentication

//@route  Postapi/auth
//@desc Authenticate user and get toekn
//access public
router.post('/', [

    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password is required').exists()


], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        email,
        password
    } = req.body;

    try {
        //See if user exits send error
        let user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            })
        }

        //Match user & password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            })
        }

        //Return json web token
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({
                token
            });
        })


    } catch (error) {
        console.error(error.message);
        res.status(400).send("server error")

    }


})

module.exports = router;