const User = require('../database/models/User')


module.exports = (req,res,next) =>{
    //fetch user from database
    User.findById(req.session.userId)
    .then( ()=> next())
    .catch( (err) => {
        console.log(err);
        res.redirect('/');
    })
    
    //verify user

    //if user is valid, permit request..

    //else redirect..

}