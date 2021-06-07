const express = require('express');
const User = require('../../Modal/User');

const gravatar = require('gravatar');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

const config = require('config');



const {
    check,
    validationResult
} = require('express-validator')

//@route  Postapi/users
//@desc register route
//access public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Enter valid password').isLength({
        min: 6
    })

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        name,
        email,
        password
    } = req.body;

    try {
        //See if user exits send error
        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User Already exits'
                }]
            })
        }


        //Get user gravatar	

        const avatar = gravatar.url(email, {
            s: '200',
            p: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        })

        //Encrypt Password usnig bcrypt
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();



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