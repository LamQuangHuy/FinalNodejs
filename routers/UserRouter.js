const express = require('express')
const Router = express.Router()

const {validationResult} = require('express-validator')

const registerValidator = require('./Validator/registerValidator')
const loginValidator = require('./Validator/loginValidator')
const nodemailer = require('nodemailer')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = require('../models/userModel')
const {admin} = require('../database_config/firebase_config');


Router.get('/',(req,res)=>{

    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:0,
            message:'get method of User router'})
})

Router.post('/login',loginValidator, (req, res) => {
    let result = validationResult(req);
    if (result.errors.length === 0) {
        let { email, password } = req.body;
        admin
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const token = jwt.sign(
                    {
                        uid: user.uid,
                        email: user.email,
                    },
                    process.env.JWT_SECRET, 
                    { expiresIn: 60 * 60 }
                );

                //views here 
                //
                //return res.status('-code-').render('views-here')        
                res.json({
                    code: 0,
                    message: 'Login successfully',
                    token: token,
                });
            })
            .catch((error) => {

                //views here 
                //
                //return res.status('-code-').render('views-here')
                res.status(401).json({
                    code: 2,
                    message: 'Login failed: ' + error.message,
                });
            });
    } else {
        let messages = result.mapped();
        let msg = '';
        for (m in messages) {
            msg = messages[m];
            break;
        }
        //views here 
        //
        //return res.status('-code-').render('views-here')
        res.json({ code: 1, message: msg });
    }
});

Router.post('/register',registerValidator, (req, res) => {
    let result = validationResult(req);
    if (result.errors.length === 0) {
        let { email, password, username } = req.body;
        admin
            .auth()
            .createUser({
                email,
                password,
            })
            .then((userRecord) => {
                const usersRef = admin.database().ref('users');
                usersRef.child(userRecord.uid).set({
                    email,
                    username,
                });
                //views here 
                //
                //return res.status('-code-').render('views-here')

                res.json({
                    code: 0,
                    message: 'User saved',
                    data: { email, username },
                });
            })
            .catch((error) => {
                //views here 
                //
                //return res.status('-code-').render('views-here')
                res.json({ code: 2, message: error.message });
            });
    } else {
        let messages = result.mapped();
        let msg = '';
        for (m in messages) {
            msg = messages[m];
            break;
        }
        //views here 
        //
        //return res.status('-code-').render('views-here')
        res.json({ code: 1, message: msg });
    }
});

Router.all('*',(req,res)=>{
    //views here 
    //
    //return res.status('-code-').render('views-here')
    res.json({code:404,
        message:'page not supported'})
})

module.exports = Router



