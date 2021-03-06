import express from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import { sendConfirmationEmail } from "../mailer";
import { sendResetPasswordEmail } from '../mailer'

const router = express.Router();

router.post("/", (req, res) => {
    const { credentials } = req.body;
    User.findOne({ email: credentials.email }).then(user => {
        if (user && user.isValidPassword(credentials.password)) {
            res.json({ user: user.toAuthJSON() });
        } else {
            res.status(400).json({ errors: { global: "Invalid credentials" } });
        }
    });
});

router.post("/google", (req, res) => {
   const { response } = req.body;
   console.log(response);
   User.findOne({googleId: response.googleId}, function (err, user) {
       if(err){
           res.status(400).json({ errors: { global: "Invalid credentials" } })
       }
       if(user){
           res.json({ user: user.toAuthJSON() });
       }
       else{
           //const { googleId, email, name, imageUrl = response;
           const user = new User();
           user.googleId = response.googleId;
           user.email = response.email;
           user.username = response.name;
           user.imageUrl = response.imageUrl;

           user.setConfirmationToken();
           user.save().then(user => {
               sendConfirmationEmail(user);
               res.json({ user: user.toAuthJSON() });
           })
       }
   })
});

router.post("/facebook", (req, res) => {
    const { response } = req.body;
    console.log(response);
    User.findOne({facebookId: response.id}, function (err, user) {
        if(err){
            res.status(400).json({ errors: { global: "Invalid credentials" } })
        }
        if(user){
            res.json({ user: user.toAuthJSON() });
        }
        else{
            //const { facebookId, email, name, imageUrl = response;
            const user = new User();
            user.facebookId = response.id;
            user.email = response.email;
            user.username = response.name;
            user.imageUrl = response.picture.data.url;

            user.setConfirmationToken();
            user.save().then(user => {
                sendConfirmationEmail(user);
                res.json({ user: user.toAuthJSON() });
            })
        }
    })
});

router.post("/confirmation", (req, res) => {
    const token = req.body.token;
    User.findOneAndUpdate(
        {confirmationToken: token},
        {confirmationToken: "", confirmed: true},
        {new: true}
    ).then(
        user =>
            user ? res.json({user : user.toAuthJSON()}) : res.status(400).json({})
    )
});

router.post('/reset_password_request', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if(user){
            sendResetPasswordEmail(user);
            res.json({});
        }else{
            res.status(400).json({ errors: {global: "There is no user with such email" }});
        }
    });
});

router.post('/validate_token', (req, res) =>{
    jwt.verify(req.body.token, process.env.JWT_SECRET, err =>{
        if(err){
            res.status(401).json({});
        }else{
            res.json({});
        }
    });
});

router.post('/reset_password', (req, res) =>{
    const { password, token } = req.body.data;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if(err){
            res.status(401).json({errors: {global: "Invalid Token"} });
        }else{
            User.findOne({ _id: decoded._id }).then(user => {
                if(user){
                    user.setPassword(password);
                    user.save().then(() => res.json({}));
                }else{
                    res.status(404).json({ errors: {gloabal: "Invalid Token"}})
                }
            });
        }
    });
});

export default router;