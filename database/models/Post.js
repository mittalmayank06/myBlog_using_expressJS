const mongoose = require('mongoose');



// Users, posts, Products

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    author : {
        type: mongoose.Schema.Types.ObjectId,  //to save post related to which userId
        ref: 'User',
        required: true
    },
    image: String,
    createdAt: {
        type: Date,
        default :new Date()
    }
});

const Post = mongoose.model('Post',PostSchema)
module.exports  = Post;