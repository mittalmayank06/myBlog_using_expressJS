const Post = require('../database/models/Post');

module.exports = async (req,res)=> {
    // res.render('post')
    const  post = await Post.findById(req.params.id).populate('author');
    // console.log(post._id);
    res.render('post', {
        post 
    })
};