const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../model/user');


router.post('/login', (req, res) => {
    const {email, password} = req.body;
    
    if(email.length != 0 && password.length != 0){
        User.find({email: email}, (error, user) => {
            if(error){
                console.log(error);
                res.json({message: "This email-id is not registered",success: false})
            }
            else{
                if(user.length == 0){
                    res.json({message: "This email-id is not registered",success: false})
                }
                else{
                    // res.send('yep you are here');
                    const isPasswordCorrect = bcrypt.compareSync(password,user[0].password);
                    if(isPasswordCorrect){
                        res.json({message: "You are now logged in",success: true, userData: user});
                    }
                    else{
                        res.json({message: "Incorrect Password",success: false});
                    }
                }
            }
            // console.log(user);
            // res.json({messaage: "debugging",success:false});
        });
    }
    else{
        res.json({message: "Email and Password fields are empty",success: false}); 
    }
    
});

router.post('/signup', (req, res) => {

    let {email, password, userName} = req.body;
    password = bcrypt.hashSync(password,10);
    let newUser = User({
        userName,
        password,
        email
    });

    newUser.save((error,user) => {
        if(error){
            res.status(500).json({error: "error saving data man"});
            console.log(error.toJSON());
        }
        else{
            // console.log(user);
            res.status(200).json({message: "Registration Successfull"});
        }
    });
});

module.exports = router;
