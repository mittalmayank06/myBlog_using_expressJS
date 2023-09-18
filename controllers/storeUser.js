const User = require('../database/models/User')

module.exports = (req,res) =>{
    User.create(req.body)
    .then( ()=>{
        res.redirect('/');
    })
    .catch( (err)=> {
        console.log(Object.keys(error.errors).map(key =>error.errors[key].message  ));
        return res.redirect('/auth/register')
    });
};