const bcrypt = require('bcrypt');
const User = require('../database/models/User')


module.exports = (req,res) => {

    const {email,password} = req.body;
    //meed to find the user
    User.findOne( {email})
    .then( (user) => {

        //compare password
        bcrypt.compare( password, user.password,)
        .then( (match)=> {
            //store user session
            req.session.userId = user._id;

            res.redirect('/');
        })
        .catch( (err) => {
            res.redirect('/auth/login');
            console.log(err);
        })

    })
    .catch( (err) =>{
        return res.redirect('/auth/login');
        console.log(err);
    })

    //compare user password
    //if user password is correct, then, login User
    //else
    //redirect user back..

}