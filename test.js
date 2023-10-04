const mongoose = require('mongoose');
const Post = require('./database/models/Post');

mongoose.connect('mongodb+srv://mittalmayank036:hf3nPuKOhd2KtXw8@nodeexpressproject1.wrswebo.mongodb.net/myBlogProject?retryWrites=true&w=majority')  //connection link
// Insert post into mongooseDB
Post.create({ 
    title: "My second blog post",
    description: 'Blog post description: it contains description of the post',
    content: 'Carrier journey started with NodeJS'
})

// searching post into mongooseDB
// Post.find({
//     title: 'My first blog post'
// })
// .then((data) => {
//     console.log(data);
// })
// .catch((err) => {
//     console.log(err);
// });
// Post.findById('64fd5e6826250bfea5f62991')
// .then( (data) =>{
//     console.log(data);
// })
// .catch((err) =>{
//     console.log(err);
// });

//Update post on mongooseDB
// Post.findByIdAndUpdate('64fd5e6826250bfea5f62991',{
//     title: 'New title for first post'
// }).then( ()=>{
//     console.log('post updated');
// })

// Delete post on mongooseDB
// Post.deleteOne({
//     title: 'New title for first post'
// })
// .then( ()=>{
//     console.log('post deleted');
// })
// .catch( (err) => {
//     console.log(err);
// })
