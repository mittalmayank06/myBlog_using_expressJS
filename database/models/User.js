const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema( {
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
    },
    email: {
        type:String,
        required:[true,'Please provide your email-ID'],
        unique: true
    },
    password: {
        type:String,
        required:[true,'Please provide password'],
        
    }
})

//need to encrypt password before saving on DB
//need to install bcrypt
UserSchema.pre('save', function(next) {
    const user = this
    bcrypt.hash(user.password, 10, function(err, encrypted) {
        user.password = encrypted;
        next()
    })
});

module.exports = mongoose.model('User',UserSchema);