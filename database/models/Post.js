const mongoose = require('mongoose');



// Users, posts, Products

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[ true,'Please provide title for post']
       
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
    },
    description: String,
    content: {
        type: String,
        required:[ true,'Please provide content']
        
    },
    username: String,
    image: String,
    createdAt: {
        type: Date,
        default :new Date()
    }
});

const Post = mongoose.model('Post',PostSchema)
module.exports  = Post;