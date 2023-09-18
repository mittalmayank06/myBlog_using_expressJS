const Post = require('../database/models/Post')

module.exports =  async (req,res)=> {
    const posts = await Post.find({})
    // console.log(posts);
    .then( (posts) => {
        console.log(req.session)  //to check user logged-in or not...
        res.render('index', {
            posts
        })
    })
    .catch( (err)=> console.log(err));
}
